import React, { useEffect, useState } from 'react';
import { postTicket } from "@/utils/httpCalls";
import { useForm } from "react-hook-form";

interface SupportFormProps {
  // isOpen: boolean;
  // onClose: () => void;
  title?: string;
  //   updateProjectData: () => void; 
}

interface FormData {
  subject: string;
  message: string;
  screenshots: FileList;
  email: string;
}

const SupportForm: React.FC<SupportFormProps> = ({ title }) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const addTicket = async (data: FormData) => {
    try {
      await postTicket(
        data,
        (response) => {
          console.log("Ticket ADD successfully:", response)
          //   updateProjectData();
        },
        (error) => {
          console.error("Error creating ticket:", error);
        }
      );
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Obtén todos los archivos seleccionados
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  
      // Crear un nuevo FileList
      const fileList = filesArray.reduce((fileList, file) => {
        fileList.items.add(file);
        return fileList;
      }, new DataTransfer());
  
      setValue("screenshots", fileList.files); // Utiliza fileList en lugar de selectedFiles
    }
  };

  return (
    <div className="modal-overlay" >
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h5 className="subtitle">{title}</h5>
            <button type="button" className="close-button">×</button>
          </div>
        )}
        <div className="modal-content">
          <form className="sidepanel-form" onSubmit={handleSubmit(addTicket)}>
            <div className="form-box">
              <p className='smallcaps'>
                Subject
              </p>
              <input
                {...register("subject", { required: true })}
                type="text"
                placeholder="Label (eg. Prospective)"
                className="app-input"
              />
            </div>
            <div className="form-box">
              <p className='smallcaps'>
                Email
              </p>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="Label (eg. Prospective)"
                className="app-input"
              />
            </div>
            <div className="form-box">
              <p className='smallcaps'>
                Message
              </p>
              <textarea
                {...register("message", { required: true })}
                placeholder="Label (eg. Prospective)"
                className="form-textarea"
              />
            </div>
            <div className="form-box">
              <span className="smallcaps">FILES*</span>
              <input
                className="form-input"
                type="file"
                accept="image/jpeg"
                onChange={handleFiles}
                multiple
              />
              {selectedFiles.length > 0 && (
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className='column-center'>
              <button className="app-button mt-4" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportForm;