import { useOrderEnd } from '@/hooks';



export default function OrderEnd() {

   const { data: order, isLoading: isLoading, error: error } = useOrderEnd();



   console.log(order);

   return (

      <p>treste</p>

   );


}
