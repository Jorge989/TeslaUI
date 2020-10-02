import { useTransform } from 'framer-motion';
import React , {useState,useLayoutEffect,useCallback} from 'react';
import { CarModel } from '../ModelsContext';
import useWrapperScroll from '../useWrapperScroll';

import { Container } from './styles';

interface Props {
  model: CarModel
}
type SectionDimensions = Pick<HTMLDivElement, 'offsetTop' | 'offsetHeight'>
const ModelOverlay: React.FC<Props> = ({model, children}) => {
 const {scrollY} = useWrapperScroll()

const getSectionDimensions = useCallback(() => {
  return {
offsetTop: model.sectionRef.current?.offsetTop,
offsetHeight: model.sectionRef.current?.offsetHeight,
  } as SectionDimensions
}, [])

 const [dimensions, SetDimensions] = useState<SectionDimensions>(
getSectionDimensions()


 )
 useLayoutEffect(() => {
   
function onResize() {
  window.requestAnimationFrame(() => SetDimensions(getSectionDimensions()))
}
window.addEventListener('resize', onResize)
return () => window.removeEventListener('resize', onResize)

 }, [])
  
 
 const sectioScrollProgress = useTransform(scrollY, y => (y - dimensions.offsetTop) / dimensions.offsetHeight)
React.useEffect(() =>{
  sectioScrollProgress.onChange(value =>
    console.log({sectioScrollProgress:value}))
}, [sectioScrollProgress])
const opacity = useTransform(sectioScrollProgress, [-0.42, -0.05, 0.05, 0.42], [0,1,1,0]
  )


const pointerEvents = useTransform(opacity, value =>
  value > 0 ? 'auto': 'none'
  )
 return (
    <Container style={{opacity, pointerEvents}}>
     {children}
    </Container>
  );
};

export default ModelOverlay;
