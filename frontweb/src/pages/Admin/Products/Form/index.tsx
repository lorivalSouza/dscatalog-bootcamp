import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'types/category';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import './styles.css';

type urlParams = {
  productId: string;
};

const Form = () => {

  const { productId } = useParams<urlParams>();

  const isEditing = productId !== 'create';

  const history = useHistory();

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Product>();

  useEffect(() => {
    requestBackend({url:'/categories'})
    .then(response => {
      setSelectCategories(response.data.content)
    })
  }, []);

  useEffect(() => {
    if(isEditing){
      requestBackend({url:`/products/${productId}`})
      .then((response) => {
        const product = response.data as Product;
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgURL', product.imgURL);
        setValue('categories', product.categories);      

      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgURL: isEditing ? formData.imgURL :
        'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg',
      categories: isEditing ? formData.categories : 
      [{ id: 1, name: '' }],
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      console.log(response.data);
      history.push('/admin/products');
    });
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="product-crud-margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>



              <div className="product-crud-margin-bottom-30">
                <Select
                options={selectCategories}
                classNamePrefix="product-crud-select"
                isMulti
                getOptionLabel={(category: Category) => category.name}
                getOptionValue={(category: Category) => String(category.id)}
                ></Select>
              </div>



              <div className="product-crud-margin-bottom-30">
                <input
                  {...register('price', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.price ? 'is-invalid' : ''
                  }`}
                  placeholder="Preço do produto"
                  name="price"
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.price ? 'is-invalid' : ''
                  }`}
                  placeholder="Descrição do produto"
                  name="description"
                  rows={10}
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary product-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
