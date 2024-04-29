import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CampaignDetails } from "@/components/dashboard/profile/CampaignProfile";
import HelpIcon from "@/components/assets/svg/Help";
import Edit from "@/components/assets/icons/edit.svg";
import { Arrow } from "@/components/assets/svg/Arrow";
import { useState } from "react";
import Search from "@/components/dashboard/table/Search";
import { v4 as uuid } from "uuid";

interface FormData {
  id: string;
  projectName: string;
  description: string;
  creator: ProfileData | null;
}

interface ProfileData {
  profile_picture_url: string;
  name: string;
}

interface DealCardProps {
  generateCard: FormData;
  creatorSavedData?: ProfileData | null;
  createdDate: Date;
}

const DealCard: React.FC<DealCardProps> = ({
  generateCard,
  creatorSavedData,
  createdDate,
}) => {
  if (!generateCard) return null;

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="card-box-container" key={generateCard.id}>
      <div className="drag-profile-info">
        <img
          src={generateCard.creator?.profile_picture_url}
          alt="Creator"
          width={70}
          height={70}
          loading="lazy"
        />
        <p>{generateCard.creator?.name}</p>
      </div>
      <div className="title-project">
        <p>{generateCard.projectName}</p>
      </div>
      <div className="description-project">
        <p>{generateCard.description}</p>
      </div>
      <div className="round-tag green">
        <p>Due: {formatDate(createdDate)}</p>
      </div>
    </div>
  );
};

export default DealCard;
