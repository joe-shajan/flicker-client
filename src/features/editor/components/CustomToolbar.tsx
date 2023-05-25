export const CustomToolbar = () => (
  <div id='toolbar' className='flex gap-4 bg-slate-100 rounded-lg'>
    <select className='ql-font'>
      <option value='arial' selected>
        Arial
      </option>
      <option value='comic-sans'>Comic Sans</option>
      <option value='courier-new'>Courier New</option>
      <option value='georgia'>Georgia</option>
      <option value='helvetica'>Helvetica</option>
      <option value='lucida'>Lucida</option>
    </select>
    <select className='ql-size'>
      <option value='extra-small'>Size 1</option>
      <option value='small'>Size 2</option>
      <option value='medium' selected>
        Size 3
      </option>
      <option value='large'>Size 4</option>
    </select>
    <select className='ql-align' />
    <select className='ql-color' />
    <select className='ql-background' />
    {/* <button className="ql-clean" /> */}
  </div>
);
