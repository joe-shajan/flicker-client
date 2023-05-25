import { Lock, X } from 'lucide-react';
import { useState } from 'react';

import { Button, Input } from '@/components';

type Props = {
  closeModal: () => void;
  Modal: React.FC<any>;
};

const ShareModal = ({ closeModal, Modal }: Props) => {
  const [copied, setCopied] = useState(false);

  return (
    <Modal>
      <div className='h-[360px] w-[600px] bg-white rounded-md flex flex-col justify-between'>
        <div className='h-[50px] flex justify-between px-6 border-b-2 border-slate-100 items-center'>
          <p>Share</p>
          <button onClick={closeModal} className=' hover:bg-slate-100 rounded-full p-1'>
            <X />
          </button>
        </div>
        <div className='p-6 flex-1'>
          <Input placeholder='Enter Email...' type='email' required />
        </div>

        <div className='h-16 border-t-2 border-slate-100 flex justify-between items-center p-6'>
          <Button
            variant='outline'
            className='rounded-full border-blue-600 text-blue-600 hover:text-blue-700'
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            {copied ? (
              'Copied'
            ) : (
              <>
                <Lock className='mr-2 h-4 w-4' /> Copy Link
              </>
            )}
          </Button>
          <Button onClick={closeModal}>Done</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
