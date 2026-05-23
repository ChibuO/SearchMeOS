import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      style={{
        background: '#400000',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Consolas, monospace',
        textAlign: 'left',
        padding: '0 20px',
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <h1 style={{ fontSize: '3rem', color: '#f20000', marginBottom: 0 }}>:(</h1>
        <br />
        <h2 style={{ color: '#fff', fontWeight: 'normal', margin: '0 0 2rem 0' }}>
          Your PC ran into a problem and needs to restart.
        </h2>
        <p style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '2rem' }}>
          There's probably an issue with the code. It'll fixed soon.
        </p>
        <p style={{ color: '#fff', fontSize: '1rem', marginBottom: '2rem' }}>
          <b>STOP CODE:</b> {error.statusText || error.message}
        </p>
        <p style={{ color: '#fff', fontSize: '0.95rem', opacity: 0.8 }}>
          For more information about this issue and possible fixes, debug the code for yourself.
          <br />
          <span style={{ color: '#f20000' }}>https://reactrouter.com/6.30.3/start/tutorial</span>
        </p>
      </div>
    </div>
  );
}
