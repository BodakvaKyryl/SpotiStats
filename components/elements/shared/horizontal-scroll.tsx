interface HorizontalScrollProps {
  children: React.ReactNode;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  return (
    <div className="scrollbar-hide overflow-x-auto">
      <div className="flex space-x-4 pb-4">{children}</div>
    </div>
  );
};
