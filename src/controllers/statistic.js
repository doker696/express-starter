import db from '@/database';

const queryBrand = (from, to) => {
  if (from && to) {
    return `select t.title, sum(t."count") 
    from ( 
        select o."productId",s.title, count(*) 
        from "OrderProduct" o inner join  ( 
            select p.id, b.id as "brandId", b."title"  
            from "products" p, "brands" b
            where p."brandId" = b.id
        ) s on s.id = o."productId" 
        ${from} and ${to.slice(6)}  
        group by o."productId",s.title
    ) t group by t.title`;
  }
  if (from) {
    return `select t.title, sum(t."count") 
    from ( 
        select o."productId",s.title, count(*) 
        from "OrderProduct" o inner join  ( 
            select p.id, b.id as "brandId", b."title"  
            from "products" p, "brands" b
            where p."brandId" = b.id
        ) s on s.id = o."productId" 
        ${from}  
        group by o."productId",s.title
    ) t group by t.title`;
  }
  if (to) {
    return `select t.title, sum(t."count") 
    from ( 
        select o."productId",s.title, count(*) 
        from "OrderProduct" o inner join  ( 
            select p.id, b.id as "brandId", b."title"  
            from "products" p, "brands" b
            where p."brandId" = b.id
        ) s on s.id = o."productId" 
        ${to}  
        group by o."productId",s.title
    ) t group by t.title`;
  }
  return `select t.title, sum(t."count") 
  from ( 
      select o."productId",s.title, count(*) 
      from "OrderProduct" o inner join  ( 
          select p.id, b.id as "brandId", b."title"  
          from "products" p, "brands" b
          where p."brandId" = b.id
      ) s on s.id = o."productId" 
      group by o."productId",s.title
  ) t group by t.title`;
};

export const ByBrand = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    let fromDate;
    let toDate;
    if (from) {
      fromDate = `where o."createdAt" > '${from}'`;
    }
    if (to) {
      toDate = `where o."createdAt" < '${to}'`;
    }
    const query = queryBrand(fromDate, toDate);
    const result = await db.query(query.replace(/\n|\r/g, ''));

    return res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const queryCategory = (from, to) => {
  if (from && to) {
    return `select t.title, sum(t."count") 
    from ( 
        select o."productId",s.title, count(*) 
        from "OrderProduct" o inner join  ( 
            select p.id, b.id as "categoryId", b."title"  
            from "products" p, "categories" b
            where p."categoryId" = b.id
        ) s on s.id = o."productId" 
        ${from} and ${to.slice(6)}  
        group by o."productId",s.title
    ) t group by t.title`;
  }
  if (from) {
    return `select t.title, sum(t."count") 
    from ( 
        select o."productId",s.title, count(*) 
        from "OrderProduct" o inner join  ( 
          select p.id, b.id as "categoryId", b."title"  
          from "products" p, "categories" b
          where p."categoryId" = b.id
        ) s on s.id = o."productId" 
        ${from}  
        group by o."productId",s.title
    ) t group by t.title`;
  }
  if (to) {
    return `select t.title, sum(t."count") 
    from ( 
        select o."productId",s.title, count(*) 
        from "OrderProduct" o inner join  ( 
          select p.id, b.id as "categoryId", b."title"  
          from "products" p, "categories" b
          where p."categoryId" = b.id
        ) s on s.id = o."productId" 
        ${to}  
        group by o."productId",s.title
    ) t group by t.title`;
  }
  return `select t.title, sum(t."count") 
  from ( 
      select o."productId",s.title, count(*) 
      from "OrderProduct" o inner join  ( 
          select p.id, b.id as "categoryId", b."title"  
          from "products" p, "categories" b
          where p."categoryId" = b.id
      ) s on s.id = o."productId" 
      group by o."productId",s.title
  ) t group by t.title`;
};

export const ByCategory = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    let fromDate;
    let toDate;
    if (from) {
      fromDate = `where o."createdAt" > '${from}'`;
    }
    if (to) {
      toDate = `where o."createdAt" < '${to}'`;
    }
    const query = queryCategory(fromDate, toDate);
    const result = await db.query(query.replace(/\n|\r/g, ''));
    return res.status(200).json(result[0]);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const ById = async (req, res, next) => {
  try {
    const { productId } = req.query;

    const result = await db.query(`SELECT DATE_TRUNC('month', o."createdAt")  AS  month, COUNT(o."productId") AS count FROM "OrderProduct" o where o."productId" = ${productId} GROUP BY DATE_TRUNC('month', o."createdAt")`);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
