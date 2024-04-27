import React, { useEffect, useState } from "react";
import { postTicket } from "@/utils/httpCalls";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "@/components/assets/icons/link.svg";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onConfirm: () => void;
  message: string;
  button: string;
}

interface FormData {
  subject: string;
  message: string;
  screenshots: FileList;
  email: string;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({ 
  isOpen, onClose, onConfirm, title, message, button }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const addTicket = async (data: FormData) => {
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("message", data.message);
    formData.append("email", data.email);
    // Append each file to the 'screenshots' field
    for (const file of selectedFiles) {
      formData.append("screenshots", file);
    }

    try {
      await postTicket(
        formData,
        (response) => {
          reset();
          setSelectedFiles([]);
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
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

      const fileList = filesArray.reduce((fileList, file) => {
        fileList.items.add(file);
        return fileList;
      }, new DataTransfer());

      setValue("screenshots", fileList.files);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h5 className="subtitle">{title}</h5>
          </div>
        )}
        <div className="modal-content">
          {message}
          <form className="sidepanel-form" onSubmit={handleSubmit(addTicket)}>
            <div className="form-box">
              <span className="smallcaps">FILES</span>
              <input
                id="fileInput"
                style={{ display: "none" }}
                type="file"
                accept="image/jpeg, image/png, image/gif, image/jpg"
                onChange={handleFiles}
                multiple
              />
              <div className="upload-files-box">
                <label htmlFor="fileInput" className="custom-file-upload">
                  Select Files
                </label>
                {selectedFiles.length > 0 && (
                  <ul>
                    <li className="ticket-files">
                      <Image src={Link} alt="Icon" width={15} height={15} />
                      {selectedFiles[selectedFiles.length - 1].name}
                    </li>
                  </ul>
                )}
              </div>
              {selectedFiles.length > 0 && (
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li className="ticket-files" key={index}>
                      <Image src={Link} alt="Icon" width={15} height={15} />
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="column-center">
              <button className="sec-button red" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadFileModal;
