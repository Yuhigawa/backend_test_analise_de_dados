import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Compras {
    @Field(__Type => ID)
    cod!: String; 
    
    @Field()
    data!: string; 
    
    @Field()
    qtd!: Number; 
    
    @Field()
    total!: Number; 
    
    @Field()
    ICMS!: Number;

    @Field()
    ST!: Number;
}

@ObjectType()
export class Vendas {
    @Field(__Type => ID)
    cod!: String; 
    
    @Field()
    data!: string; 
    
    @Field()
    qtd!: Number; 
    
    @Field()
    total!: Number;
}

@ObjectType()
export class Total {
    @Field()
    compras!: Number; 
    
    @Field()
    vendas!: Number; 
    
    @Field()
    ICMS!: Number; 
    
    @Field()
    ST!: Number;
}