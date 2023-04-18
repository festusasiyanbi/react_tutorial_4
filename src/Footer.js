const Footer = () => {
  const newDate = new Date();

  return (
    <footer className='Footer'>
      <p>Copywright &copy; {newDate.getFullYear()}</p>
    </footer>
  )
}

export default Footer;
