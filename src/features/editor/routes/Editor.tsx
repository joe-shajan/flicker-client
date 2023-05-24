import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { QuillBinding } from "y-quill";
import { WebrtcProvider } from "y-webrtc";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import "../styles/editor.css";
import { docLogo } from "@/constants";

const CustomToolbar = () => (
  <div id="toolbar" className="flex gap-4 bg-slate-100 rounded-lg">
    <select className="ql-font">
      <option value="arial" selected>
        Arial
      </option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
    <select className="ql-size">
      <option value="extra-small">Size 1</option>
      <option value="small">Size 2</option>
      <option value="medium" selected>
        Size 3
      </option>
      <option value="large">Size 4</option>
    </select>
    <select className="ql-align" />
    <select className="ql-color" />
    <select className="ql-background" />
    {/* <button className="ql-clean" /> */}
  </div>
);

export const Editor = () => {
  console.log("in editor");
  const { id } = useParams();

  let quillRef: any = null;
  let reactQuillRef: any = null;

  console.log(id);

  // useEffect(() => {
  //   if (!id) {
  //     navigate({
  //       pathname: '/editor',
  //       search: '?id=123',
  //     });
  //   }
  // }, []);

  const attachQuillRefs = () => {
    if (typeof reactQuillRef.getEditor !== "function") return;
    quillRef = reactQuillRef.getEditor();
  };

  useEffect(() => {
    console.log("in editor useEffect");
    attachQuillRefs();

    // Quill.register("modules/cursors", QuillCursors);
    // https://github.com/yjs/yjs/blob/master/README.md

    if (!id) return;

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(id, ydoc);

    // Sync clients with the y-websocket provider
    new WebsocketProvider("ws://localhost:1234", "", ydoc);

    const ytext = ydoc.getText("quill");

    new QuillBinding(ytext, quillRef, provider.awareness);
    // const binding = new QuillBinding(ytext, quillRef, provider.awareness);
    // console.log(binding);
  }, []);

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  return (
    <>
      <div className="h-[15vh] flex flex-col justify-between py-3 ps-8 pe-8">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div>{docLogo()}</div>
            <div className="flex flex-col justify-between">
              <h4 className="text-lg font-semibold text-slate-600 leading-none">
                Doc name
              </h4>
              <div className="flex gap-2 text-xs text-slate-600 leading-none">
                <p>File</p>
                <p>Edit</p>
                <p>View</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            <button className="bg-slate-900 h-9 px-3 rounded-md text-white">
              Share
            </button>

            <div className="w-9 h-9 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <CustomToolbar />
      </div>
      <div className="bg-slate-100 flex p-4 gap-4 justify-center">
        <ReactQuill
          ref={(el: any) => {
            reactQuillRef = el;
          }}
          modules={modules}
          formats={formats}
          placeholder="Start writing..."
          style={{
            height: "calc(85vh - 32px)",
            width: "50%",
            background: "#fff",
            border: "0px !important",
            borderRadius: "6px",
          }}
        />
        <div className="flex flex-col gap-6 w-1/5">
          <div className="h-[50%] w-[100%] bg-white rounded-md"></div>
          {/* <div className="h-[50%] w-[100%] bg-white rounded-md"></div> */}
        </div>
      </div>
    </>
  );
};
