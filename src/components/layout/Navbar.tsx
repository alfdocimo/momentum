import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// https://app.brandmark.io/v3/#logo_data=%7B%22keywords%22%3A%22headspace%20mindful%20meditation%22%2C%22id%22%3A%22logo-20694e55-8bbb-4886-8808-c6a392230143%22%2C%22layout%22%3A0%2C%22title%22%3A%22MOMENTUM%22%2C%22titleFamily%22%3A%22Montserrat%22%2C%22titleVariant%22%3A%22200%22%2C%22titleColor%22%3A%5B%7B%22hex%22%3A%22%230c0621%22%2C%22location%22%3A0%7D%5D%2C%22titleScale%22%3A1.25%2C%22titleLetterSpace%22%3A5%2C%22titleLineSpace%22%3A1.1%2C%22titleBoldness%22%3A0%2C%22titleX%22%3A0%2C%22titleY%22%3A0%2C%22titleAlign%22%3A%22center%22%2C%22slogan%22%3A%22%22%2C%22sloganFamily%22%3A%22Montserrat%22%2C%22sloganVariant%22%3A%22400%22%2C%22sloganColor%22%3A%5B%7B%22hex%22%3A%22%230c0621%22%7D%5D%2C%22sloganScale%22%3A1%2C%22sloganLetterSpace%22%3A0%2C%22sloganLineSpace%22%3A1.1%2C%22sloganBoldness%22%3A0%2C%22sloganAlign%22%3A%22center%22%2C%22sloganX%22%3A0%2C%22sloganY%22%3A0%2C%22icon%22%3Anull%2C%22showIcon%22%3Afalse%2C%22iconScale%22%3A1%2C%22iconColor%22%3A%5B%7B%22hex%22%3A%22%230c0621%22%7D%5D%2C%22iconContainer%22%3Anull%2C%22showIconContainer%22%3Afalse%2C%22iconContainerScale%22%3A1%2C%22iconContainerColor%22%3A%5B%7B%22hex%22%3A%22%230c0621%22%7D%5D%2C%22iconSpace%22%3A1%2C%22iconX%22%3A0%2C%22iconY%22%3A0%2C%22nthChar%22%3A0%2C%22container%22%3Anull%2C%22showContainer%22%3Afalse%2C%22containerScale%22%3A1%2C%22containerColor%22%3A%5B%7B%22hex%22%3A%22%230c0621%22%7D%5D%2C%22containerX%22%3A0%2C%22containerY%22%3A0%2C%22backgroundColor%22%3A%5B%7B%22hex%22%3A%22%23ec4388%22%7D%5D%2C%22palette%22%3A%5B%22%23ec4388%22%2C%22%230c0621%22%2C%22%230c0621%22%2C%22%230c0621%22%2C%22%230c0621%22%5D%7D

export default function Navbar() {
  const { data } = useSession();
  const userImage =
    data?.user?.image ||
    `https://avatars.dicebear.com/api/adventurer/${data?.user?.id}`;

  return (
    <div
      className="navbar sticky top-0 z-20 
      backdrop-blur-sm"
    >
      <div className="navbar-start">
        <button
          onClick={() => {
            signOut();
          }}
          className="btn-outline btn"
        >
          Log out🚪
        </button>
      </div>
      <div className="navbar-center">
        <Link href="/app">
          <span className="link-hover link text-xl font-bold normal-case text-primary">
            momentum 💭
          </span>
        </Link>
      </div>
      <div className="navbar-end">
        <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
          <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            <Image
              className="w-10 rounded-full"
              src={userImage}
              alt="user image"
              layout="fill"
            />
          </div>
        </label>
      </div>
    </div>
  );
}
