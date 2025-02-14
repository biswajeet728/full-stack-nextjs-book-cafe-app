"use client";

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imageKit: { urlEndpoint, publicKey },
    apiEndPoint,
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${apiEndPoint}/api/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "Sign_In" | "Sign_Up" | "Create_Book" | "Update_Book";
  formKey: string;
  onValueChange: (value: string) => void;
  accept: string;
  folder: string;
  placeHolder?: string;
  isEditing?: boolean;
  uploading?: boolean;
  setUploading?: (value: boolean) => void;
}

function ImageUpload({
  formKey,
  type,
  onValueChange,
  accept,
  folder,
  placeHolder,
  isEditing = false,
  uploading = false,
  setUploading,
}: Props) {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{
    filePath: string;
    fileType?: string;
  } | null>(null);

  const onError = (error: any) => {
    setUploading && setUploading(false);

    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setUploading && setUploading(false);
    setFile(res);
    onValueChange(res.url);

    toast({
      title: `File uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        folder={folder}
        accept={accept}
        className="hidden"
        onUploadStart={() => {
          setUploading && setUploading(true);

          toast({
            title: "Uploading file....",
            description: `Your File is being uploaded. Please wait.`,
          });
        }}
        disabled={uploading}
      />

      {type === "Sign_Up" && (
        <button
          type="button"
          className="p-2 flex items-center gap-2"
          onClick={() => {
            if (ikUploadRef.current) {
              // @ts-ignore
              ikUploadRef.current.click();
            }
          }}
        >
          <Paperclip size={16} className="text-white text-opacity-40" />
          <label className="text-white text-opacity-40 text-sm cursor-pointer">
            {"Upload Profile Image (Optional)"}
          </label>
        </button>
      )}

      {type === "Create_Book" && (
        <button
          type="button"
          className="p-2 flex items-center gap-2"
          onClick={() => {
            if (ikUploadRef.current) {
              // @ts-ignore
              ikUploadRef.current.click();
            }
          }}
        >
          <Paperclip size={16} className="text-white text-opacity-40" />
          <label className="text-white text-opacity-40 text-sm cursor-pointer">
            {file?.fileType === "non-image" ? file.filePath : placeHolder}
          </label>
        </button>
      )}

      {!isEditing && type !== "Create_Book" && (
        <div className="mx-2">
          {file && (
            <>
              {file.fileType === "image" ? (
                <IKImage
                  alt={file.filePath!}
                  path={file.filePath!}
                  width={500}
                  height={300}
                  className="rounded-lg w-1/3 h-1/3 object-cover self-center"
                />
              ) : null}
            </>
          )}
        </div>
      )}
    </ImageKitProvider>
  );
}

export default ImageUpload;
