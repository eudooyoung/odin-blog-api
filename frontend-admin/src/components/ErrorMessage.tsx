export const ErrorMessage = ({ error }: { error: Error }) => {
  return <p role="alert">{error.message}</p>;
};
