import { FC, MouseEvent, ReactNode } from "react";
import { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ILink extends LinkProps {}
export interface ILinkNext {
  href: string;
  children: ReactNode;
}

const Link: FC<ILink> = (props) => {
  const { children, href, shallow } = props;

  // const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLoading = (e: MouseEvent<HTMLAnchorElement>) => {
    // dispatch(setStatusLoading({ status: "start", to: "link", time: 10 }));
    if (!shallow) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <a
      {...props}
      style={{ display: "contents" }}
      onClick={(e) => handleLoading(e)}
      href={href.toString() || "/notfound"}
    >
      {children}
    </a>
  );
};

export default Link;
