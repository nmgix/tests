import "./link.scss";

type LinkProps = { link: string; component: React.ReactNode };

const Link: React.FC<LinkProps> = ({ link, component }) => {
  return (
    <a href={link} className='link'>
      {component}
    </a>
  );
};

export default Link;
