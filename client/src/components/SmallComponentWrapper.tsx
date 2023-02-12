export default function SmallComponentWrapper({
  children
}: {
  children?: any;
}) {
  console.log(children);

  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      {children}
    </div>
  );
}
