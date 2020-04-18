import React, { useState } from 'react';

import { MdMoreHoriz } from 'react-icons/md';

import { Container, Menu, Actions } from './styles';

export default function ActionsMenu({ actions, generic }) {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    setVisible(!visible);
  }

  function renderIcon(action) {
    if (!action.icon) {
      return null;
    }

    const Icon = action.icon;
    return <Icon color={action.color} />;
  }

  return (
    <Container>
      <button type="button" onClick={handleVisible}>
        <MdMoreHoriz size={24} color="#C6C6C6" />
      </button>
      <Menu visible={visible} size={actions.lenght}>
        <Actions>
          {actions.map(action => (
            <div>
              <button
                type="button"
                onClick={() => {
                  handleVisible();
                  action.onClick(generic);
                }}
              >
                {renderIcon(action)}
                <span>{action.label}</span>
              </button>
            </div>
          ))}
        </Actions>
      </Menu>
    </Container>
  );
}
