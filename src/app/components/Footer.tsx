export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-links">
        <a href="#">Documentation</a>
        <a href="#">Changelog</a>
        <a href="#">GitHub</a>
        <a href="#">Twitter</a>
        <a href="#">Discord</a>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>
      <p>© {new Date().getFullYear()} Nexorbit. All rights reserved.</p>
    </footer>
  );
}
