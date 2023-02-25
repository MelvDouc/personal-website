export default function SmallComponentWrapper({ children }: { children?: any; }) {
  return (
    <div className="small-component-wrapper">
      {children}
    </div>
  );
}
