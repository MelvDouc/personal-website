export default function SmallComponentWrapper({ children }: { children?: any; }) {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      {children}
    </div>
  );
}
