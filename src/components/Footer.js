function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyrights">&copy;{year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
