import React from "react";
import Icon from "../assets/icons/icon.svg";
import Image from "next/image";
import { Arrow } from "@/components/assets/svg/Arrow";

interface BreadcrumbItem {
  label: string;
  link: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
}: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <ol role="list" className="row-items-center">
        {items?.map((item, index) => (
          <li key={index} className="row-items-center">
            {item?.current || index === items?.length - 1 ? (
              <span className="text-brown">
                {item?.label}
              </span>
            ) : (
              <a className="text-gray" href={item.link}>
                {item?.label}
              </a>
            )}
            {index < items?.length - 1 && (
              <div className="bread-arrow">
                <Arrow className="arrow-right" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
