// 'use client';

// import { CreateProduct, ProductService } from '@/Services/Product';
// import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
// import { useState } from 'react';
// import { useMutation, useQueryClient } from 'react-query';
// import Swal from 'sweetalert2';

// const ModalNewProduct = () => {
//   const [open, setOpen] = useState(false);
//   const queryClient = useQueryClient();
//   const [productEdited, setProductEdited] = useState<CreateProduct>({
//     name: '',
//     brand: '',
//     price: 0,
//     color: '',
//     model: ''
//   });

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   const { mutate: handleSubmit, isLoading } = useMutation({
//     mutationFn: async () => {
//       const service = new ProductService();
//       await service.createProduct(productEdited);
//     },
//     onSuccess: () => {
//       Swal.fire('Adicionado com Suceso!');
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
//       <button
//         onClick={showDrawer}
//         className='border border-gray-300 rounded-md px-4 py-2 text-white bg-blue-800 hover:bg-blue-600 h-12 self-center'
//       >
//         + Novo Produto
//       </button>
//       <Drawer
//         title={`Adicionar novo produto`}
//         width={640}
//         onClose={onClose}
//         open={open}
//         styles={{
//           body: {
//             paddingBottom: 10,
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
//               Adicionar
//             </Button>
//           </Space>
//         }
//       >
//         <Form
//           layout='vertical'
//           initialValues={{
//             ['name']: '',
//             ['brand']: '',
//             ['price']: '',
//             ['color']: '',
//             ['model']: '',
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
//             </Row>
//             <Row gutter={16}>
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
//             </Row>
//             <Row gutter={12}>
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

// export default ModalNewProduct;
