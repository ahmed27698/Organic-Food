import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { BsTwitterX ,BsInstagram  } from "react-icons/bs";
import { FaLocationArrow , FaFacebookF , FaTiktok } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

import { NavBarPages } from '../clientPage'
import Link from "next/link";

export default function page() {
    return (
        <section>
            <NavBarPages navLink='/'/>
            <div className='relative'>
                <img src="/vegetables.jpg" alt="image" className='z-0 md:h-[600px] h-[400px] w-full'/>
                <div className='absolute w-full bottom-0 lg:p-20 md:p-10 p-5 flex flex-col md:flex-row md:justify-between items-start  md:items-center'>
                    <div>
                        <p className='text-green-600 font-bold'>// Welcome to our company</p>
                        <p className='text-white font-bold lg:text-6xl md:text-4xl text-2xl'>News Feeds</p>
                    </div>
                    <div className='flex gap-4'><Link href='/' className='text-white font-bold'>Home</Link><span className='text-white'>|</span><p className='text-green-600 font-bold'>News</p></div>
                </div>
            </div>
            <h2 className="py-30 font-bold text-6xl text-center">
                News Contact Here
            </h2>
            <footer className='lg:mt-30 relative'>
                <div className='flex flex-wrap lg:px-10 md:px-7 px-4 lg:absolute lg:-top-20'>
                    <div className='flex items-center bg-white gap-5 w-full sm:w-6/12 lg:w-3/12 p-7 shadow-[0_0_1px_gray]'>
                        <img className='w-10 h-10' src="data:image/webp;base64,UklGRtAEAABXRUJQVlA4WAoAAAAQAAAAMgAAMQAAQUxQSOICAAABgFXbVt1qSUACEnBQHFwcFAeNg+DgxkFx0DgIDhIHiQNwsD/y6ENBREwAlx+z1qfll82sbSyq7nfs46UOcG39mVilwj5qft1/ImgJHBuVptn8wLoZLvZVqv23/KSOi08tKRW9vhPVBnNi+1kZICt+w2sxnMaqrZgdTXr5j03NcGq1OE6HXJrih6wGzl9yXLaL/Ge8wombtADuAlYZzP/08p9ytSULSf4CW8GsWprCNafhwNTmAKymnZksUAtRHWabr7FUs0vyHCYFMLMCBHUkWSh6w2s2wLxwbNoKgyKYKkOSh9LeIKoG0AjY282SFL1GgKRI2M3lHbI8qABeUp00TbI7NOIVQe/NC1CqARtTGiUpA+bRr8X8K4FWj+97e6EVIKrj2AxSADdLqlVKWEmzJMWzsRqg6HEEowyuto5BzWvEa8iqxi56ngRNBsyi8SSoM2tzmLU5r4LXk6wOMyockZWBoHRCmwcFyApWrcMVZRZZzFbNkVcHJFlgmPo/k6URrEa8nhb+NOKUwWv4iCTNkoMsB1n75mCUgaUeoQkISuxNHKUNWBeAQSlFA0QFiPJHSU8Di+IO8BrBKO1GcWyVwKs7Ikuzd62ZI6cE/qicoQxG6QSflVHh2H+qAFdgrGabfy0qZvkjvmCvmTbaVu8n42dG8OqukBVekur039/mCu4tqwSD3KUgaSmlbNrPU6/ZAEnmKKiDdeOqW5Uthy6kXJr203PS4yjLkhR39+n1uGHWFnjT+JjGRft1+u9vKjgtAEGbJK0KfNj6NJRN+7nK75IMrhuV+bIPKRdpdXCf9Or7fpL71nFsK0nn/GinWBfDvpRfMUrber/t5/lXnFJoOjU/8pKDrM57nxR+wf69NAJJ979+ktavmNu9f82SNADYJmkbs56fcX/9c6ral5yC4dDEYIGsp7lkb49+WrVfSuq84aOD6sMCt3v/mrRvZUje8dWw6LyMKXp+03Upp85bvgtWUDggyAEAALALAJ0BKjMAMgA+fTiUR6SjoiE19d5gkA+JbAC9E8LJl7l+M3FBRTP/+VP0M8gHz0zHL1Afrv+oHvX+iX0AP2S9HL2E/QA/YD0tP2j+CD9p/239poHkbs/lwtVPogHPZVxHbqOCwAD+3UR/U9IT+vGBTSEx9eXiSnRp6l+otu9lr3BP/45w3ZXtXe5+TGmVBe4kpU18oJofv9Xp5G4NcgNDWOEqsP/M5kpDbyxq/5qAMZu8z4cHlbf9FUVvVkbi9oP9CouodxydIeerq0W9Oi0tW2RKnoIgAoW0QMQCiQyS8w8CF3JhymTGlVSXmRNwZPdP1m5YX2Xr+DfDrah0t+0zOp0iLqv5l4X7GmuUbrT/06exmIml4Pmea+B3AH9cJ6gV9bn60mMj2445PlRSxVfOx6Q8FziVFegxZODw0sQa74bf0FTNshaTBPzDuWU9T2l0OmtnqbkaTLIfZ0yXoEsLic/G71shDUvvfH7XX6dLGg30CQ8jd4e8fv3vKHNa4+Qx4MP/UW4/bbTXZn++A13+ygF/Eb0elv/V79uS38p++TX//58UJVpu+sNDwXf1w5CEswCqE25e2MxTypw4Xv/E3isQZbgAAA==" alt="image" />
                        <div>
                            <p className='font-bold'>Curated Products</p>
                            <p>Provide free home delivery for all product over $100</p>
                        </div>
                    </div>
                    <div className='flex items-center bg-white gap-5 w-full sm:w-6/12 lg:w-3/12 p-7 shadow-[0_0_1px_gray]'>
                        <img className='w-10 h-10' src="data:image/webp;base64,UklGRr4FAABXRUJQVlA4WAoAAAAQAAAAMQAAMQAAQUxQSMoDAAABsCRtf1t7ylu9Am2gq7UEkaZtEUZZRc+5qv8C+po0ShaZ2TF5BMcr4JhptMiZY3LGLkYZeQffwDrh9goiYgJ4UneYJuk8Hd/BK9N0i6Scc96kcrSvgFg0J0fVtlmle7JBW+RqP+tsnsScNRggHKZpmg4PAEmLe4qgHoiLtOW8SaUzELWYu3RFSwALMK+tBbBx1eIgarrBNBZ/1jpuOllcA9Zwud2Kg17tVQdVE5hR+xIB7PHoAdxWHKzFXJE0ppSSZe9TSmmWB1MkOQCnM0SlS6as3Ow0gVcMSjuSIqzLpaRYMU3z2DQVBnmcppPaitkW6GUr9qgZIJxULUcL2K08ml7K1Hs5vNrdQcoG3CSNyfuQZulowK8qwTpwp5MHrxaUgF6zB0JRb6jbrLMD4iYPtkiyGPWgDJQZwGtzALYxAFHFAEYjRIWgBMqw7pQBWzYLEKXiAKLOAMrgdD4pgkbQFaM8+21tNe5IirsR6KUBnBJoBJYMTgNVnUzJFday6wGMBaICVgmsRuhla6OkttYqwLbsqlnQKsAkD+sK2MZg2jGAawxYDZCULngNMAqiekA9RKk49q1UHKwZmGUr5rxZrEbImwGnBNvaKle0thohL4BXqgxqYZCHeQH8TpNd5p3RyZYMWYBVD5hJAziNQFIAdqOkdscoKcCcgV4e81A0gCmbBcxWDGwZaPsArrHQ9gGMRvDK9lS0BjBnBfZBCUYZqq1UPNWgCOfNeOVowJ7VUt8yRKWa1la5lmVBI4Z9LIpcXDKwFlObXKl5DYAG9vGsNXBZu6BzZZTU7mzZzC4TumORkuEWep0MQJsCgDvLU5M0R8PVozoDDDp7LseiCNiTWoLjZjurPAKtND0YwD4u2hzQSyNXNu/oTge/g7iqB+ygi1syAG32ALbpDtOieqxgsjyAiWnMQwrUTfPQnc7ab3lIwWHnUsNq2F3pmu44Fe3nnKI3ALbzJPkanvoLD+/vpkX7LX/xi2+2XOuVzCSubN7RnSZV8/i/P3jgJb2Ny03zeNRSlHbu8TAt2q/5a3rZAn/5ATXbPHTf/NOkizkCbpK05SEFBzzTiwB/+03TddNvdXHOffrIr7+kBBClPhguNp/WV47Tovq/9ePUev/z3wK8SZ+oFR0ttnnoDtOk+pbz//4RvOElvQ3gprDp8pz79GU9A/jLD4Bbnn/5XYo7CCml1nuqz/TiHV7zuh2c5Go3vvN3r22apvn6V5umad67PDZXPkzqufOk+/fcOWj09zbcO6rlxuee46nNpusT/8xPhk356sjnP3ATVlA4IM4BAABwCgCdASoyADIAPnkwkEekoyGhO/ksAJAPCWwAvJwhE6OSYgzyFw/+jZzN6gP2S/Sv32fQdzwHsAftV7AHlBftn8B/7b/tJ7Rv//BDSMr+W58gmCiIfi+0e7T3wAD+5k//+PH//HM//+NbL999hcf/3eDNSnq60rmVw6aNmzm/P0YOw20pMLMCBJ/uWj3p3fik69pfkjvFQGVrjc6ek+QYyrTZn9sM4kbmcE9o2GW1FNxOW5kz0r8/IsJ6Qnv+EAE3/wv619/5IPW/6CrtjLVtezl+acB9eJij/z7wT0hUzzmWii/yXkNt4UBR5BkEXHALtV0gVI0AZWl+tv7Xmw8Bc6W9fheA/2Hua64qMGu/YyNWv5mh9Zm9Cfm/J9cdGwxN0JWJekFFVM/9Pr8hq0ooNWyjrRdxvoFMEYz/mL++eq9MqNBj8mHdkMsLkH+x5CDH6lEzInad7SAA2sHVW8l9AaQ/7IeqC2ocpSuIFdwksQ35oBxDBUKzn8JISj92b15cgdufm5F09dsQmJ/6h9RdbN3iBQff8Hf//KVa+pGDXZ13Sg0SF//2JeA1oTxyjsEt0X0pn//KSuffx58N+omvf48+G/Op06pgAAAAAAA=" alt="image" />
                        <div>
                            <p className='font-bold'>Handmade</p>
                            <p>We ensure the product quality that is our main goal</p>
                        </div>
                    </div>
                    <div className='flex items-center bg-white gap-5 w-full sm:w-6/12 lg:w-3/12 p-7 shadow-[0_0_1px_gray]'>
                        <img className='w-10 h-10' src="data:image/webp;base64,UklGRqADAABXRUJQVlA4WAoAAAAQAAAAMAAALgAAQUxQSCcCAAABoFttm9vK+Ur4O9gpYTq4KAH5GiKWXReLo2yz6wogQmXEUQGLkfcCI3kJkI0MR97rDWAIoIKImACtMN9zrjVbDQd2K7KGyqkkX08kSLJ0XE1BpX4gX0uXbMATVpJzoWHiSkr8SFrLoZNsn0tiLUQpI/SqFQUyKSesJEWpxKQSv4ibEFup6SQ7dlrQN7SbkQu8iFJFsYA/UiZqG/CUGUEFUfNbSyEraaynyCPyQLIFAkGSCuoBl/7kaw5OC6ZkPZUUPfk/ScG0YM6FBi21A45aywbyIQXy3h5vm/O6buv6WTdLhY04SkkZL+6AFOMBqP0MEY13raRXgKow9bMS7s6U701ShfQERK+J7kBxUsCkgiAp4G78yyNNt46T7pJL6toB/xkvqO/8GPEkz4WkC7xU8pDvJb85b2EkUJyk7mhSRpAOv/zNBy1Ad+GHcg46/S5BElFGgo9jFXKn0YLkZ1B3dFI86i48l3hWE92e5DVnRmOK2F+U8h3Ns65nmz1UpnkL2izwA48lWUhA2wBUmWYvEi38qOE8xBjjRWFa0pXQ2cg6bcc7WrU1lFq1b7k+Oztb0fP8x2C9WYe9Cd9d3M2yUCXabAX5b/x6U8MWEsVSbg+taaJPZMtsjzwmaLKjXWLT0mXq8JN0gZ8tq0l3JWUc/RR/7GymTUMKpn4BOzdkW5LXnG7bkoJp1B+g2W232xoOXnOeQ3fXNDkrE/0q17xVlWtGyzLNDwBWUDggUgEAAFAIAJ0BKjEALwA+gTaUR6UjIiE1WA34oBAJbADFtRZaGEA/VX9gOEA/qv8z6yD0AP2A9KP2FP2y9gX9av/qFxuWy0GgOfPWRD6sEAD++gJ//2w//9rsf/9pj2tiTHqV6dQey//+H7//Dkf/+GH3BjbGkbTN1dU78vAqKd3TvpWh/1dMnY/vWn/w5fj3+O3k+VZZPEi4gr8p/4W68fLRVajTuvVN2tN/uy3FXM9RwrVZLgMdb96WHKYvAEv5G3456+1YLfiKi/fGioKPtmGyhObC2tJkiotxhlro+/i88A7+xwN0uVnR+JW3rIBsgPnF6kvcKoX325jHzvQjiRL6Ki+vtzyAANckPu8ZdxXNR1bupLLfY//hdFA05zK/S5cfu3jhN2nCBAAo8DMxGXlEZdYCFr63B54rQR3CWyBlwYHYyqYO8/+AW7cbFKrqJwbgAAAA" alt="image" />
                        <div>
                            <p className='font-bold'>Natural Food</p>
                            <p>Return product within 3 days for any product you buy</p>
                        </div>
                    </div>
                    <div className='flex items-center bg-white gap-5 w-full sm:w-6/12 lg:w-3/12 p-7 shadow-[0_0_1px_gray]'>
                        <img className='w-10 h-10' src="data:image/webp;base64,UklGRuYCAABXRUJQVlA4WAoAAAAQAAAAMgAAJQAAQUxQSHEBAAABkKPtnxsnvxt4bJNKx1432P8JyFGVs11uR4YhZ1BPciwJbdb/AAR1ULGpJEg3+BXSjkbjhz4iJoCvsEPXAwjx/WWcfe86GsSuPHy1ceOBzVsfmTTb9qMYOdDkUV87bNbT2maT73w1K0yvDo2CWaJjbkJp87tUW66HoxiqlIDWObQTkFIr39KGhOouJ8ITpuFhnXPhmSI3wWGO68G0HL9TQnHvhDFhnd9Sgqgp/yPTipqIWsbl59zc3DHAvCTZOQzMzrm/qDjcIfnSACfm7lJY/gWTM7PrBeewRPc/Jcti3WbsGAxICn/EcXwQb9kGMNHlxHTs/pSKCXYnAFiu41B8k0IFAENFWZigZpuKhIKy0gBC4VCL/X/uAvQMPPyzB5aVkmg5o8Web2cB5lr39xctCFz4NgrLTFV1ApWGKcpztPCYUFDuEu7rfAIgyosJHxPsRADWuV7DZOykKTkHr3NkmnaYmRowSUGqwLMoWViDXQwAVlA4IE4BAABQCgCdASozACYAPpE6mEeloyKhLVzLaLASCWwAuzOvv/fDfiNxCELJBrgk6NX+AegD9UP0g99jngOsl9ADysP2Z+Cj9tfSvCEnzXCJ92BvpFp3cwIEDIz/+/QAAP7e1j/7Wh1Y4J8HX6HM0uKnqcmyp2f5MlZeV1JmVZa5LqTMqyw3P94IdXxt9Ex+rqkZGkL15H/Eca69Arl31u7/qbQ+oChRcof5aM0dJX+jiuJ2//56ijSxiYAiTVYuEmxEgpXJ//N/+N1G+69kHLpCxdQZPK2gspsH/hpcbM8Hwrx3pgSuV4UnNLmmJdHG8+Ica7yBgqyzCGX9GyvAcVLvPPkqj0fFYeEPyBoV4emDvn41hJoTDezHvnm4cb8Ka/hOhZmWOyRKW7TW/zXCQPVLbUS/xViLD/nj9aEPUs3/ovD0ETpTkswhScMqKzxZYAAA" alt="image" />
                        <div>
                            <p className='font-bold'>Free home delivery</p>
                            <p>We ensure the product quality that you can trust easily</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap gap-8 bg-[#F7F5EB] lg:px-10 md:px-7 px-4 lg:pt-30 pb-8'>
                    <div className='flex flex-col gap-5 md:w-2/12'>
                        <img className='w-8/12' src="data:image/webp;base64,UklGRiwEAABXRUJQVlA4WAoAAAAQAAAAmQAAKQAAQUxQSO0CAAABkNva2p1YX+7EGaklcsv5fTlzeOfhfCw3YBpA1w2goQFr6AA6mBc5FGAJOsAdHIn/+7//MMDcVxIRENxIUiRF9jDF6pruC/L/NNnNVVMDQMoSH3afAzNgPQ6xBSYMHYwsZ2V0BZQAMAswB3CIKQKpL58GLoGblMncJ8lZ0F08BbHaQiXXe09Y0aC++NNNj1lkUkGzEZH4EcCLTZm6NIr11T22B/ZwqSTbwMY0LZVZdA0Et1vFTgbwCDwJXdHTGVA6xtOlE2lGBlHZ9cB6VrAiAdkQabARbYHFAL1phwUAnECkWX/xans0g5/G40tvNNSIEwnJUgTe0vqX4wo0qX9aifWaaAkrU0VhmqwjSiQoy3Fj9aE38JIsWEZF7/jiA0Ww02icYG+bTCmRsCzFsHuIRSRuh23uMwmvgvYm3bpO9esiGel6MRKZqoEqlajUJowIIcsA4PD00+1Ulc8iOwH0X8RhOqifVFuKjURKKjKqRkmIMLIk7sRjIpIPHi/i2LKrvjRIzcaoW7n6k8gXq6KP1C8nRBhZDm/nl0g22Kxslp3LWmnVPiJiN2FDpzZHqPSYESHCyDIM8LPJ/LJRVNRjha6MBFPbcUT01bYIL0vwAhgnj0WxdwwSwJaoCeqAYxOmMeFlOfbGTiatcdByaO2OoLEZn7jiZQkWwMraTWTvyNzdJ/Exp8swpcnHnK6AZ+uuZzVutxWGjKUJoxV6s3mv7cekO6YgRBhZhgTABEbyGMDNApWQRD1x2u4SZ0Q/WqiOnBBhZMN4U4i5wUJWQLy/kSPMvFCPihgHKPixZyyiRceECCNL0QLIt8ZlafGSJBIgmE4CfMB43REi1HhNEQ/ALjO60yR3t51GH4W42DmOt3kySp7v5US6SEJc8rwwdlcrv1RSnQD6rhmLEIik/Fx6mhIilCyJOqWKfmAun0vUHU280P99fDKJXwAsY/XFRD6btHvgcCP5C5by+aR6AZ4fJJkk8hkln7THvX9UEQBWUDggGAEAALAJAJ0BKpoAKgA+kUiZSiWkoiGmeAwAsBIJYwB4ZkQIANstdju8qgRbkc0FH/EKSxwe06B4nD9qPnxOl0b2m/v/oL5eJzVhvvpRsmCUwjsLXMkSpHrAAP7zf//+GH8A/ICZI7kOH7h/AKZXBlLwuvFYWf37FI10gPXv+fwf04tN0oQVT/vjZ//yPibis6WQLBu0Zq+w//9Oqq7hzK6/LTkGxB/9/Z8wt8UKEhBfe2UFFxOnForPVlGMn1J9VA+HnKHO+mzPgjd8gTlkIfbpyMVzsN4DlTH0cHfsfJF31/gNfC/+5xkFtc5mK54DKeUNo++6y4I3Zeqv/GO0VmT1qdhR8eOvAwBEwSap//8dEdHPidMySzhAAAA=" alt="" />
                        <p>Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum is dummy text of the printing.</p>
                        <div className='flex gap-4 items-center'><IoLocationOutline/>Brooklyn, New York, United States</div>
                        <div className='flex gap-4 items-center'><FiPhoneCall/>+0123-456789</div>
                        <div className='flex gap-4 items-center'><CiMail />example@example.com</div>
                        <div className='flex gap-2'><FaFacebookF  /><FaTiktok  /><BsInstagram  /><BsTwitterX/></div>
                    </div>
                    <div className='flex flex-col gap-5 md:w-2/12'>
                        <p className='font-bold'>Company</p>
                        <a href="#" className='hover:text-green-600'>About</a>
                        <a href="#" className='hover:text-green-600'>Blog</a>
                        <a href="#" className='hover:text-green-600'>AllProducts</a>
                        <a href="#" className='hover:text-green-600'>Location Map</a>
                        <a href="#" className='hover:text-green-600'>FAQ</a>
                        <a href="#" className='hover:text-green-600'>Contact us</a>
                    </div>
                    <div className='flex flex-col gap-5 md:w-2/12'>
                        <p className='font-bold'>Services</p>
                        <a href="#" className='hover:text-green-600'>Order tracking</a>
                        <a href="#" className='hover:text-green-600'>Wish List</a>
                        <a href="#" className='hover:text-green-600'>Login</a>
                        <a href="#" className='hover:text-green-600'>My Account</a>
                        <a href="#" className='hover:text-green-600'>Terms & Conditions</a>
                        <a href="#" className='hover:text-green-600'>Promotional Offers</a>
                    </div>
                    <div className='flex flex-col gap-5 md:w-2/12'>
                        <p className='font-bold'>Customer Care</p>
                        <a href="#" className='hover:text-green-600'>Wishlist</a>
                        <a href="#" className='hover:text-green-600'>Login</a>
                        <a href="#" className='hover:text-green-600'>My Account</a>
                        <a href="#" className='hover:text-green-600'>Order tracking</a>
                        <a href="#" className='hover:text-green-600'>FAQ</a>
                        <a href="#" className='hover:text-green-600'>Contact us</a>
                    </div>
                    <div className='flex flex-col gap-5 md:w-2/12'>
                        <p className='font-bold'>Newsletter</p>
                        <p>Subscribe to our weekly Newsletter and receive updates via email.</p>
                        <div className='flex'>
                            <input type="text" placeholder='Email*' className='border-2 border-gray-50 outline-0 p-4 focus:border-green-600'/>
                            <button className='p-4 text-white bg-green-600'><FaLocationArrow/></button>
                        </div>
                        <p className='font-bold'>We Accept</p>
                        <img src="data:image/webp;base64,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" alt="visa image" />
                    </div>
                </div>
                <div className='flex md:flex-row flex-col justify-around bg-black p-8'>
                    <p className='text-white'>All Rights Reserved @ Company 2025</p>
                    <div className='flex gap-4 md:flex-row flex-col'>
                        <a href="#" className='hover:text-green-500 text-white'>Terms & Conditions</a>
                        <a href="#" className='hover:text-green-500 text-white'>Claim</a>
                        <a href="#" className='hover:text-green-500 text-white'>Privacy & Policy</a>
                    </div>
                </div>
            </footer>
        </section>
    )
}
