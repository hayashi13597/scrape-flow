interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-2">
      {children}
    </main>
  );
};

export default layout;
