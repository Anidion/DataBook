type Props = {
  className?: string;
  text: string;
};

export const DividerWithText: React.FC<Props> = ({ className, text }) => (
  <div className={`${className} flex items-center gap-4`}>
    <div className="w-full border-t border-default-100" />
    <p className="text-default-400">{text}</p>
    <div className="w-full border-t border-default-100" />
  </div>
);
