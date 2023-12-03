import { useEffect } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MoonIcon } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Players",
    href: "/players",
  },
];

export default function Layout({ children }: Props) {
  const navigate = useNavigate();
  const routerState = useRouterState();

  useEffect(() => {
    if (routerState.location.pathname.endsWith("index.html")) {
      navigate({ to: "/" });
    }
  }, [routerState]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-1/2 w-1/2 flex-col rounded border border-border bg-background text-foreground">
        <div className="flex w-full items-center justify-between border-b border-border px-5 py-4">
          <span className="text-lg font-bold">CFX NUI</span>
          <Button size="sm" variant="outline">
            <MoonIcon />
          </Button>
        </div>

        <div className="flex h-full">
          <div className="flex w-1/5 flex-col gap-1 border-r border-border px-3 pt-4">
            {links.map((link) => {
              const isSelected = routerState.location.pathname === link.href;

              return (
                <Button
                  key={link.href}
                  variant={isSelected ? "outline" : "ghost"}
                  asChild
                >
                  <Link to={link.href as any}>{link.label}</Link>
                </Button>
              );
            })}
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}