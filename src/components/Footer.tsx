function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return <footer>© {year}</footer>;
}

export default Footer;
