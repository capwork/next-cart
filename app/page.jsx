 "use client";

import { useMemo, useState } from "react";
import {
  ArrowRight, ChevronRight, Heart, Menu, Minus, Plus, Search,
  ShoppingBag, Star, UserRound, X, Truck, ShieldCheck, RotateCcw,
  Sparkles, Trash2
} from "lucide-react";

const images = {
  hero: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85",
  women: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
  men: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=85",
  accessories: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=85",
  shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
  bag: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
  watch: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
  jacket: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
  glasses: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
  sneaker: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85"
};

const products = [
  {id:1,name:"Essential Tailored Blazer",category:"Women",price:6499,old:7999,rating:4.8,reviews:82,badge:"Bestseller",image:images.women},
  {id:2,name:"Everyday Oxford Shirt",category:"Men",price:2499,old:2999,rating:4.7,reviews:64,badge:"New",image:images.men},
  {id:3,name:"Leather Studio Bag",category:"Accessories",price:4299,old:5499,rating:4.9,reviews:113,badge:"Editor's Pick",image:images.bag},
  {id:4,name:"Street Runner 02",category:"Shoes",price:4999,old:5999,rating:4.8,reviews:91,badge:"Trending",image:images.shoes},
  {id:5,name:"Minimal Steel Watch",category:"Accessories",price:3799,old:4499,rating:4.6,reviews:48,badge:"New",image:images.watch},
  {id:6,name:"Weekend Bomber",category:"Men",price:4599,old:5999,rating:4.7,reviews:75,badge:"-23%",image:images.jacket},
  {id:7,name:"Classic Frame Sunglasses",category:"Accessories",price:1999,old:2499,rating:4.5,reviews:39,badge:"Popular",image:images.glasses},
  {id:8,name:"Studio Court Sneaker",category:"Shoes",price:5499,old:6499,rating:4.8,reviews:106,badge:"Hot Pick",image:images.sneaker}
];

const categories = [
  ["Women", images.women], ["Men", images.men], ["Shoes", images.shoes], ["Accessories", images.accessories]
];

const money = n => `₹${n.toLocaleString("en-IN")}`;

export default function Home() {
  const [category,setCategory] = useState("All");
  const [query,setQuery] = useState("");
  const [sort,setSort] = useState("featured");
  const [cart,setCart] = useState([]);
  const [wish,setWish] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [mobile,setMobile] = useState(false);
  const [selected,setSelected] = useState(null);

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (category === "All" || p.category === category) &&
      `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
    );
    if(sort==="low") list.sort((a,b)=>a.price-b.price);
    if(sort==="high") list.sort((a,b)=>b.price-a.price);
    if(sort==="rating") list.sort((a,b)=>b.rating-a.rating);
    return list;
  },[category,query,sort]);

  const count = cart.reduce((a,p)=>a+p.qty,0);
  const total = cart.reduce((a,p)=>a+p.price*p.qty,0);

  const add = p => {
    setCart(c => c.some(x=>x.id===p.id)
      ? c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x)
      : [...c,{...p,qty:1}]);
    setCartOpen(true);
  };
  const changeQty = (id,d) => setCart(c=>c.map(x=>x.id===id?{...x,qty:x.qty+d}:x).filter(x=>x.qty>0));
  const toggleWish = id => setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const go = id => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMobile(false); };

  return (
    <div className="site">
      <div className="announcement"><span>Complimentary delivery on orders over ₹1,499</span><span>New season arrivals are here <ArrowRight size={13}/></span></div>

      <header className="header">
        <button className="mobile-menu" onClick={()=>setMobile(!mobile)}><Menu/></button>
        <button className="brand" onClick={()=>go("home")}>next<span>cart</span></button>
        <nav className={mobile?"nav open":"nav"}>
          <button onClick={()=>go("home")}>Home</button>
          <button onClick={()=>go("shop")}>Shop</button>
          <button onClick={()=>go("categories")}>Collections</button>
          <button onClick={()=>go("story")}>Our story</button>
        </nav>
        <div className="actions">
          <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products"/></div>
          <button className="round"><UserRound size={19}/></button>
          <button className="round cart-button" onClick={()=>setCartOpen(true)}><ShoppingBag size={19}/>{count>0&&<b>{count}</b>}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img src={images.hero} alt="Next Cart collection"/>
          <div className="hero-shade"/>
          <div className="hero-content">
            <span className="eyebrow">THE NEW EVERYDAY</span>
            <h1>Style that<br/><i>stays with you.</i></h1>
            <p>Thoughtfully selected essentials, elevated classics and pieces made for wherever life takes you.</p>
            <div className="hero-actions"><button className="dark-btn" onClick={()=>go("shop")}>Shop the collection <ArrowRight size={16}/></button><button className="light-link" onClick={()=>go("categories")}>Explore collections</button></div>
          </div>
          <div className="hero-note"><span>01</span><div><b>Fall / Winter</b><small>2026 collection</small></div></div>
        </section>

        <section className="perks">
          <div><Truck/><span><b>Fast delivery</b> across India</span></div>
          <div><ShieldCheck/><span><b>Quality checked</b> every order</span></div>
          <div><RotateCcw/><span><b>Easy returns</b> within 7 days</span></div>
          <div><Sparkles/><span><b>Curated picks</b> every season</span></div>
        </section>

        <section className="section" id="categories">
          <div className="section-top"><div><span className="kicker">EXPLORE</span><h2>Made for your <i>world.</i></h2></div><button className="arrow-link" onClick={()=>go("shop")}>View all <ArrowRight size={15}/></button></div>
          <div className="collection-grid">
            {categories.map(([name,img])=><button key={name} className="collection" onClick={()=>{setCategory(name);go("shop")}}><img src={img} alt={name}/><div><span>{name}</span><small>Shop now <ArrowRight size={13}/></small></div></button>)}
          </div>
        </section>

        <section className="section shop" id="shop">
          <div className="section-top"><div><span className="kicker">JUST IN</span><h2>Pieces you'll <i>love.</i></h2></div><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select></div>
          <div className="pills">{["All","Women","Men","Shoes","Accessories"].map(x=><button key={x} className={category===x?"selected":""} onClick={()=>setCategory(x)}>{x}</button>)}</div>
          <div className="product-grid">
            {filtered.map(p=><article className="product" key={p.id}>
              <div className="product-image" onClick={()=>setSelected(p)}><img src={p.image} alt={p.name}/><span className="badge">{p.badge}</span><button className={wish.includes(p.id)?"heart active":"heart"} onClick={e=>{e.stopPropagation();toggleWish(p.id)}}><Heart size={17} fill={wish.includes(p.id)?"currentColor":"none"}/></button><button className="quick" onClick={e=>{e.stopPropagation();setSelected(p)}}>Quick view</button></div>
              <div className="product-info"><span>{p.category}</span><h3>{p.name}</h3><div className="rating"><Star size={13} fill="currentColor"/><b>{p.rating}</b><small>({p.reviews})</small></div><div className="product-price"><div><strong>{money(p.price)}</strong><del>{money(p.old)}</del></div><button onClick={()=>add(p)}><Plus size={17}/></button></div></div>
            </article>)}
          </div>
        </section>

        <section className="story" id="story">
          <div className="story-image"><img src={images.accessories} alt="Accessories collection"/></div>
          <div className="story-copy"><span className="kicker">WHY NEXT CART</span><h2>Less noise.<br/><i>More you.</i></h2><p>Next Cart is built around a simple idea: shopping should help you find what fits your life, not overwhelm you with everything that exists.</p><p>We bring together versatile pieces, considered details and everyday quality — so your choices feel easier and your wardrobe feels more like you.</p><button className="arrow-link">Discover our story <ArrowRight size={15}/></button></div>
        </section>

        <section className="newsletter"><div><span className="kicker">THE NEXT EDIT</span><h2>A little inspiration,<br/>delivered.</h2></div><form onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Your email address"/><button className="dark-btn">Join the list <ArrowRight size={15}/></button></form></section>
      </main>

      <footer><div className="footer-main"><div><button className="brand footer-brand">next<span>cart</span></button><p>Everyday pieces, thoughtfully chosen.</p></div><div><h4>Shop</h4><button>Women</button><button>Men</button><button>Shoes</button><button>Accessories</button></div><div><h4>Help</h4><button>Shipping</button><button>Returns</button><button>Order tracking</button><button>Contact</button></div><div><h4>About</h4><button>Our story</button><button>Journal</button><button>Careers</button><button>Stores</button></div></div><div className="footer-bottom"><span>© 2026 Next Cart</span><span>Thoughtfully made for everyday.</span></div></footer>

      {cartOpen&&<div className="backdrop" onClick={()=>setCartOpen(false)}><aside className="cart" onClick={e=>e.stopPropagation()}><div className="cart-head"><div><span className="kicker">YOUR BAG</span><h3>{count} item{count!==1?"s":""}</h3></div><button onClick={()=>setCartOpen(false)}><X/></button></div>{cart.length?<><div className="cart-list">{cart.map(p=><div className="cart-row" key={p.id}><img src={p.image} alt={p.name}/><div><b>{p.name}</b><span>{money(p.price)}</span><div className="qty"><button onClick={()=>changeQty(p.id,-1)}><Minus size={12}/></button><strong>{p.qty}</strong><button onClick={()=>changeQty(p.id,1)}><Plus size={12}/></button><button className="remove" onClick={()=>setCart(c=>c.filter(x=>x.id!==p.id))}><Trash2 size={13}/></button></div></div></div>)}</div><div className="cart-bottom"><div><span>Subtotal</span><strong>{money(total)}</strong></div><small>Taxes and delivery calculated at checkout.</small><button className="dark-btn checkout">Checkout <ArrowRight size={15}/></button></div></>:<div className="empty"><ShoppingBag size={38}/><h3>Your bag is empty</h3><p>Find something you'll want to keep.</p><button className="dark-btn" onClick={()=>setCartOpen(false)}>Continue shopping</button></div>}</aside></div>}

      {selected&&<div className="backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><div className="modal-img"><img src={selected.image} alt={selected.name}/></div><div className="modal-copy"><span className="kicker">{selected.category}</span><h2>{selected.name}</h2><div className="rating"><Star size={14} fill="currentColor"/><b>{selected.rating}</b><small>{selected.reviews} reviews</small></div><p>Designed for everyday versatility with considered details, comfortable materials and an easy-to-style silhouette.</p><div className="modal-price">{money(selected.price)} <del>{money(selected.old)}</del></div><div className="checks">✓ Quality checked<br/>✓ Easy 7-day returns<br/>✓ Fast delivery</div><button className="dark-btn full" onClick={()=>{add(selected);setSelected(null)}}>Add to bag <ShoppingBag size={16}/></button></div></div></div>}
    </div>
  );
}
