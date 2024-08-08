'use client';
import { AvatarProps } from "@/types/interfaces";
import Image from "next/image";

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <Image
            className="rounded-full"
            height="30"
            width="30"
            alt="Avatar"
            src={src || './Logo.png'}
        />
    );
}

export default Avatar;