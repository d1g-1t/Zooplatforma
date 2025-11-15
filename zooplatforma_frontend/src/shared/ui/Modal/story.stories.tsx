import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Modal from './index';
import { ModalProps } from './types';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<ModalProps>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    const handleClose = () => setIsOpen(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Открыть модалку</button>
        <Modal {...args} isOpen={isOpen} onClose={handleClose}>
          <p>Контент модалки Контент модалки Контент модалки </p>
        </Modal>
      </>
    );
  },
  args: {
    isOpen: true,
  },
};
