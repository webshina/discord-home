type Props = {
  size?: number;
  twinkle?: boolean;
};
export const Logo: React.FC<Props> = (props) => {
  return (
    <div
      className="neon font-[200] text-center leading-tight"
      style={{
        fontSize: props.size ?? 20,
      }}
    >
      Di<span className={props.twinkle ? 'twinkle' : ''}>sc</span>ord HO
      <span className={props.twinkle ? 'twinkle' : ''}>M</span>E AI
    </div>
  );
};
