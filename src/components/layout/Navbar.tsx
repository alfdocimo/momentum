import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data } = useSession();
  const userImage =
    data?.user?.image ||
    `https://avatars.dicebear.com/api/adventurer/${data?.user?.id}`;

  return (
    <div className="navbar sticky top-0 z-20 bg-neutral text-neutral-content drop-shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <Link href="/app/posts/create">Create post</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-end">
        <Link href="/app/profile">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <div className="w-10 rounded-full ring ring-secondary ring-offset-2 ring-offset-base-100">
              <Image
                className="w-10 rounded-full"
                src={userImage}
                alt="user image"
                layout="fill"
              />
            </div>
          </label>
        </Link>
      </div>
    </div>
  );
}
