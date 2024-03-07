// "use client";

// import { ProductService } from '@/Services/Product';
// import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
// import { PenSquare } from 'lucide-react';
// import { useState } from 'react';
// import { useMutation, useQueryClient } from 'react-query';
// import Swal from 'sweetalert2';
// import { IProduct } from '../TableProduct';

// type Product = {
//   product: IProduct;
// };

// const ModalProduct = ({ product }: Product) => {
//   const [open, setOpen] = useState(false);
//   const queryClient = useQueryClient();
//   const [productEdited, setProductEdited] = useState<IProduct>({ ...product });

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   const { mutate: handleSubmit, isLoading } = useMutation({
//     mutationFn: async () => {
//       const service = new ProductService();
//       await service.updateProduct(productEdited);
//     },
//     onSuccess: () => {
//       Swal.fire('Editado com Suceso!');
//       queryClient.invalidateQueries(['get_products']);
//       onClose();
//     },
//     onError: () => {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Ocorreu algum erro!',
//       });
//       onClose();
//     },
//   });

//   return (
//     <>
//       <button onClick={showDrawer}>
//         <PenSquare size={18} stroke='green' />
//       </button>
//       <Drawer
//         title={`Editando: ${product.name}`}
//         width={640}
//         onClose={onClose}
//         open={open}
//         styles={{
//           body: {
//             paddingBottom: 80,
//           },
//         }}
//         extra={
//           <Space>
//             <Button key='back' danger onClick={onClose}>
//               Cancelar
//             </Button>
//             ,
//             <Button
//               key='submit'
//               type='primary'
//               className={'bg-blue-700 text-white'}
//               onClick={() => handleSubmit()}
//               loading={isLoading}
//             >
//               Atualizar
//             </Button>
//           </Space>
//         }
//       >
//         <Form 
//           layout='vertical'
//           initialValues={{
//             ["name"]: product.name,
//             ["brand"]: product.brand,
//             ["price"]: product.price,
//             ["color"]: product.color,
//             ["model"]: product.model,
//           }}
//         >

//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name='name'
//                 label='Name'
//                 rules={[
//                   { required: true, message: 'Nome do produto é obrigatório' },
//                 ]}
//               >
//                 <Input
//                   placeholder='Por favor, entre com o nome do produto'
//                   value={productEdited.name}
//                   onChange={(e) =>
//                     setProductEdited({ ...productEdited, name: e.target.value })
//                   }
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name='brand'
//                 label='Brand'
//                 rules={[
//                   { required: true, message: 'Brand do produto é obrigatório' },
//                 ]}
//               >
//                 <Input
//                   style={{ width: '100%' }}
//                   placeholder='Por favor, entre com a marca do produto'
//                   value={productEdited.brand}
//                   onChange={(e) =>
//                     setProductEdited({
//                       ...productEdited,
//                       brand: e.target.value,
//                     })
//                   }
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name='model'
//                 label='Model'
//                 rules={[
//                   { required: true, message: 'Model do produto é obrigatório' },
//                 ]}
//               >
//                 <Input
//                   style={{ width: '100%' }}
//                   placeholder='Por favor, entre com o modelo do produto'
//                   value={productEdited.brand}
//                   onChange={(e) =>
//                     setProductEdited({
//                       ...productEdited,
//                       model: e.target.value,
//                     })
//                   }
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name='price'
//                 label='Price'
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Por favor, entre com o preço do produto',
//                   },
//                 ]}
//               >
//                 <Input
//                   type='number'
//                   min={0}
//                   placeholder='Por favor, entre com o preço do produto'
//                   value={productEdited.price}
//                   onChange={(e) =>
//                     setProductEdited({
//                       ...productEdited,
//                       price: Number(e.target.value),
//                     })
//                   }
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name='color'
//                 label='Color'
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Cor do produto é obrigatório',
//                   },
//                 ]}
//               >
//                 <Input
//                   style={{ width: '100%' }}
//                   placeholder='Por favor, entre com a cor do produto'
//                   value={productEdited.color}
//                   onChange={(e) =>
//                     setProductEdited({
//                       ...productEdited,
//                       color: e.target.value,
//                     })
//                   }
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Drawer>
//     </>
//   );
// };

// export default ModalProduct;
