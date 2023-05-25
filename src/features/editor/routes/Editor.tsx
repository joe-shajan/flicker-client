import { Lock } from 'lucide-react';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { QuillBinding } from 'y-quill';
import { WebrtcProvider } from 'y-webrtc';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

import '../styles/editor.css';
import { Button } from '@/components';
import { docLogo } from '@/constants';
import { useModal } from '@/hooks';

import { CustomToolbar } from '../components/CustomToolbar';
import ShareModal from '../components/ShareModal';

const Header = ({ openModal }: { openModal: () => void }) => {
  return (
    <div className='h-[15vh] flex flex-col justify-between py-3 ps-8 pe-8'>
      <div className='flex justify-between'>
        <div className='flex gap-3'>
          <div>{docLogo()}</div>
          <div className='flex flex-col justify-between'>
            <h4 className='text-lg font-semibold text-slate-600 leading-none'>Doc name</h4>
            <div className='flex gap-2 text-xs text-slate-600 leading-none'>
              <p>File</p>
              <p>Edit</p>
              <p>View</p>
            </div>
          </div>
        </div>

        <div className='flex gap-6 items-center'>
          <Button onClick={openModal}>
            <Lock className='mr-2 h-4 w-4' /> Share
          </Button>

          <div className='w-9 h-9 bg-gray-300 rounded-full'></div>
        </div>
      </div>
      <CustomToolbar />
    </div>
  );
};

export const Editor = () => {
  console.log('in editor');
  const { id } = useParams();
  const { Modal, openModal, closeModal } = useModal();

  let quillRef: any = null;
  let reactQuillRef: any = null;

  const attachQuillRefs = () => {
    if (typeof reactQuillRef.getEditor !== 'function') return;
    quillRef = reactQuillRef.getEditor();
  };

  useEffect(() => {
    attachQuillRefs();

    // Quill.register("modules/cursors", QuillCursors);
    // https://github.com/yjs/yjs/blob/master/README.md

    if (!id) return;

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(id, ydoc);

    // Sync clients with the y-websocket provider
    new WebsocketProvider('ws://localhost:1234', '', ydoc);

    const ytext = ydoc.getText('quill');

    new QuillBinding(ytext, quillRef, provider.awareness);
    // const binding = new QuillBinding(ytext, quillRef, provider.awareness);
    // console.log(binding);
  }, []);

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
  ];

  return (
    <>
      <Header openModal={openModal} />
      <div className='bg-slate-100 flex p-4 gap-4 justify-center'>
        <ReactQuill
          ref={(el: any) => {
            reactQuillRef = el;
          }}
          modules={modules}
          formats={formats}
          placeholder='Start writing...'
          style={{
            height: 'calc(85vh - 32px)',
            width: '50%',
            background: '#fff',
            border: '0px !important',
            borderRadius: '6px',
          }}
        />
        <div className='flex flex-col gap-6 w-1/5'>
          <div className='h-[50%] w-[100%] bg-white rounded-md'></div>
          {/* <div className="h-[50%] w-[100%] bg-white rounded-md"></div> */}
        </div>
      </div>
      <ShareModal closeModal={closeModal} Modal={Modal} />
    </>
  );
};
