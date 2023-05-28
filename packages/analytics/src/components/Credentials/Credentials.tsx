import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Modal from '../Modal';
import CredentialsForm from './CredentialsForm';

export default function Credentials() {
  const [isOpen, setIsOpen] = useState(false);

  const { isReady } = useRouter();

  useEffect(() => {
    if (!isReady) return;
    setIsOpen(true);
    return () => setIsOpen(false);
  }, [isReady]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        /* */
      }}
    >
      <Modal.Content>
        <Modal.Title id="credentials-title">Enter credentials</Modal.Title>
        <Modal.Description>
          To visualize your analytics data in the pre-built dashboard, you need
          to specify a token with read access to the pipes, and your workspace
          Host.
        </Modal.Description>
        <CredentialsForm />
      </Modal.Content>
    </Modal>
  );
}
