export default function SmallComponentWrapper({ children }: { children?: any; }) {
  return (
    <div className="h-100 p-2 d-flex flex-column align-items-center justify-content-center">
      {children}
    </div>
  );
}
