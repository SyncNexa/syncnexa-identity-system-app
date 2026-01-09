import FileUploadIcon from "@/assets/icons/FileUploadIcon";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./style/Style.module.css";
import Replace from "@/assets/icons/Replace";

function DocumentSelector({
  formats,
  label,
  onSelect,
  buffering,
}: DocumentSelector) {
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function processFiles(files: FileList | File[]) {
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreview(url);
    });
  }

  function handleClick() {
    inputRef.current?.click();
  }

  function handleLoad() {
    if (inputRef.current) {
      const files = inputRef.current.files;
      if (!files) return;
      processFiles(files);
      inputRef.current.files = null;
    }
  }

  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);

    if (!e.dataTransfer.files?.length) return;

    processFiles(e.dataTransfer.files);
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className={styles.doc_uploader}>
      {preview ? (
        <div className={styles.preview_wrapper}>
          <Image
            src={preview}
            alt=""
            width={200}
            height={200}
            className={styles.preview}
          />
          <button onClick={handleClick}>
            <Replace />
          </button>
        </div>
      ) : (
        <div className={styles.wrapper}>
          {label && <p className={styles.label}>{label}</p>}
          <div
            className={`${styles.inner} ${isDragging ? styles.active : ""}`}
            ref={selectRef}
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <FileUploadIcon />
            <p>Click to Upload or Drag & drop here</p>
            <small>
              Supported format: {formats.slice(0, formats.length - 1).join(",")}{" "}
              & {formats.at(-1)}
            </small>
            <input
              ref={inputRef}
              type="file"
              className={styles.select}
              onChange={handleLoad}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentSelector;
