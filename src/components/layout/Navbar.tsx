import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { data } = useSession();
  const userImage =
    data?.user?.image ||
    "https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg";

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">Jobnica</a>
      </div>
      <div className="flex-none">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full">
              <Image
                className="w-10 rounded-full"
                src={userImage}
                alt="user image"
                layout="fill"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/app/settings">
                <a className="justify-between">Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/app/settings">
                <a className="justify-between">Profile</a>
              </Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
