import { v4 as uuid } from "uuid";
import cloneDeep from "lodash/cloneDeep";
import isFunction from "lodash/isFunction";
import { UserEntity } from "../schemas/user.entity";
import { CartEntity } from "../schemas/cart.entity";
import { OrderEntity } from "../schemas/order.entity";
import { ProductEntity } from "../schemas/product.entity";

type CollectionName = "users" | "carts" | "orders" | "products";

class DB {
  users: UserEntity[] = [];
  carts: CartEntity[] = [];
  orders: OrderEntity[] = [];
  products: ProductEntity[] = [];

  initialize(predefinedData: any = {}) {
    this.users = predefinedData?.users || [];
    this.carts = predefinedData?.carts || [];
    this.orders = predefinedData?.orders || [];
    this.products = predefinedData?.products || [];
  }

  create(collectionName: CollectionName, payload: any): any {
    const item = {
      id: uuid(),
      ...payload,
    };

    this[collectionName].push(item);

    return item;
  }

  find(collectionName: CollectionName, predicate: any) {
    const entities = this[collectionName].filter(predicate);

    return cloneDeep(entities);
  }

  findOne(collectionName: CollectionName, predicate: any): any {
    const entity = this[collectionName].find(predicate) || null;

    return cloneDeep(entity);
  }

  getOne(collectionName: CollectionName, id: string): any {
    const entity = this[collectionName].find((entity) => entity.id === id);

    return cloneDeep(entity);
  }

  getAll(collectionName: CollectionName) {
    const entities = this[collectionName];

    return cloneDeep(entities);
  }

  updateOne(collectionName: CollectionName, id: string, updater: any) {
    const entityIndex = this[collectionName].findIndex(
      (entity) => entity.id === id
    );
    if (entityIndex === -1)
      throw Error(
        `[DB] Can't update entity with id '${id}' in collection '${collectionName}'`
      );

    if (isFunction(updater)) {
      this[collectionName][entityIndex] = updater(
        cloneDeep(this[collectionName][entityIndex])
      );
    } else {
      this[collectionName][entityIndex] = {
        ...this[collectionName][entityIndex],
        ...updater,
      };
    }
  }

  deleteOne(collectionName: CollectionName, id: string) {
    const entityIndex = this[collectionName].findIndex(
      (entity) => entity.id === id
    );
    if (entityIndex === -1)
      throw Error(
        `[DB] Can't delete entity with id '${id}' in collection '${collectionName}'`
      );

    this[collectionName].splice(entityIndex, 1);
  }

  deleteAll(collectionName: CollectionName) {
    this[collectionName] = [];
  }

  delete(collectionName: CollectionName, predicate: any) {
    const remainEntities = this[collectionName].filter(
      (entity) => !predicate(entity)
    );

    this[collectionName] = remainEntities as any;
  }
}

export default new DB();
