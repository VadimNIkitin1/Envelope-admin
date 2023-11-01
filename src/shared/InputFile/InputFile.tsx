import { useRef, useState } from 'react';
import style from './InputFile.module.scss';

interface IUpload {
  filePath: string;
}

// interface ISelectedFile {
//   name: string;
// }

const InputFile = () => {
  const [selectedFile] = useState<any>();
  const [upload] = useState<IUpload | null>(null);
  const filePicker: any = useRef(null);

  const handlePick = () => {
    filePicker.current.click();
  };

  // const handleChange = (event: any) => {
  //   console.log(event.target.files[0]);
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     alert('Выберите файл');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', selectedFile);
  // };

  return (
    <div className={style.container} onClick={handlePick}>
      <div className={style.header}>
        {upload ? (
          <img src={upload.filePath} height="100px" alt="" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                stroke="#7669c8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{' '}
            </g>
          </svg>
        )}
        <p>Добавьте изображение</p>
      </div>
      <label htmlFor="file" className={style.footer}>
        <svg fill="#7669c8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
            <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
          </g>
        </svg>
        <p style={{ color: '#fff' }}>{selectedFile ? selectedFile.name : 'Файл не выбран'}</p>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
              stroke="#7669c8"
              stroke-width="2"
            ></path>{' '}
            <path d="M19.5 5H4.5" stroke="#7669c8" stroke-width="2" stroke-linecap="round"></path>{' '}
            <path
              d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
              stroke="#7669c8"
              stroke-width="2"
            ></path>{' '}
          </g>
        </svg>
      </label>
      <input
        ref={filePicker}
        // onChange={handleChange}
        className={style.file}
        type="file"
        accept="/image/*,.png,.jpg,.jpeg,.gif,.web,.webp"
      />
    </div>
  );
};

export default InputFile;
