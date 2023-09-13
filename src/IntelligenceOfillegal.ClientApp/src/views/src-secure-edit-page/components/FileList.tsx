import { usePageStateContext } from '../context';

export const FileList = () => {
  const { fileList } = usePageStateContext();

  //const { handleSearchFormSubmit } = usePageActionContext();

  return (
    <div className="col-4">
      <div className="card">
        <div className="card-header">附加檔案</div>
        <ul className="list-group list-group-flush">
          {fileList &&
            fileList.map((file, index) => (
              <li key={index} className="list-group-item mb-2">
                <a href={file.filePath}>{file.fileName}</a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
