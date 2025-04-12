import Image, { ImageProps } from 'next/image';

export default function CustomImage(props: ImageProps) {
  const customLoader = ({ src, width, quality }: { src: string, width: number, quality?: number }) => {
    const prefix = process.env.NODE_ENV === 'production' ? '/BrunaVilleneBeauty' : '';
    
    if (src.startsWith('http')) return src;
    
    return `${prefix}${src}`;
  };

  return <Image {...props} alt={props.alt || ''} loader={customLoader} />;
}