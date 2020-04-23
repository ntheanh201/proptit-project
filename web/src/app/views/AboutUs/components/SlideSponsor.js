import React, {useState, useEffect} from 'react'
import './../styles/SlideCompanion.css'
import './../styles/SlideSponsor.css'
import gold from './../../../assets/gold.png'
import diamond from './../../../assets/diamond.png'
import silver from './../../../assets/silver.png'
export default function SlideSponsor() {
    const [mem, setMem] = useState([
        {
            image: 'https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/s960x960/83794155_2551944795024669_2545637553109729280_o.jpg?_nc_cat=106&_nc_sid=174925&_nc_ohc=53sKtee5ck8AX-Xj6vy&_nc_ht=scontent.fhan3-3.fna&_nc_tp=7&oh=66cadfc19efac5623ca9f732e8401024&oe=5EC3BA88',
            name: 'Nguyễn Văn Học',
            khoa: 'D18',
            rank: 'gold'
        },
        {
            image: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-9/s960x960/79406775_2390572367922230_7389855695102803968_o.jpg?_nc_cat=104&_nc_sid=174925&_nc_ohc=4jwSTXuc4bMAX8kkd3w&_nc_ht=scontent.fhan4-1.fna&_nc_tp=7&oh=ab962b3fdec05ee12d0bed8f31393a59&oe=5EC2F2BB',
            name: 'Trần Minh Quang',
            khoa: 'D18',
            rank: 'gold'
        },
        {
            image: 'https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/62067740_2383088618605081_8412783516210692096_n.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=mIowPTIiS-kAX-mq5QS&_nc_ht=scontent.fhan3-2.fna&oh=5b45af6b3d8a15f61f6c604a4c679f55&oe=5EC48BF5',
            name: 'Nguyễn Việt Hương',
            khoa: 'D18',
            rank: 'silver'
        },
        {
            image: 'https://scontent.fhan3-2.fna.fbcdn.net/v/t31.0-8/p960x960/17359037_1985626588331570_566222989922575259_o.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=6f5PqvqLyOcAX9YXZfs&_nc_ht=scontent.fhan3-2.fna&_nc_tp=6&oh=16780da9a162d16e215fad4760fa2de7&oe=5EC36320',
            name: 'Nguyễn Tiến Hải',
            khoa: 'D17',
            rank: 'diamond'
        },
        {
            image: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/s960x960/81728579_1419518378201108_7874011037505159168_o.jpg?_nc_cat=102&_nc_sid=174925&_nc_ohc=oHWFB_LNsaQAX-_zTJM&_nc_ht=scontent.fhan3-1.fna&_nc_tp=7&oh=1b213bb14fccf5549035716efe0e6ab9&oe=5EC5636A',
            name: 'Đô Đô',
            khoa: 'D17',
            rank: 'diamond'
        },
    ]);

    const [indexGold, setIndexGold] = useState(0);
    const [indexSilver, setIndexSilver] = useState(0);
    const [indexDiamond, setIndexDiamond] = useState(0);

    const [goldRank, setGoldRank] = useState(mem.filter(member => {
        return member.rank === 'gold';
    }));

    const [silverRank, setSilverRank] = useState(mem.filter(member => {
        return member.rank === 'silver';
    }));

    const [diamondRank, setDiamondRank] = useState(mem.filter(member => {
        return member.rank === 'diamond';
    }));
    var carouselInterval;
    var carouselInterval2;
    var carouselInterval3;

    const startCarousel = () => {
        carouselInterval = setInterval(() => {
            toDownGold();
        }, 4000);
    };
    const startCarousel2 = () => {
        carouselInterval2 = setInterval(() => {
            toDownDiamond();
        }, 4000);
    };
    const startCarousel3 = () => {
        carouselInterval3 = setInterval(() => {
            toDownSilver();
        }, 4000);
    };

    useEffect(() => {
        startCarousel();
        startCarousel2();
        startCarousel3();
        return () => {
            clearInterval(carouselInterval);
            clearInterval(carouselInterval2);
            clearInterval(carouselInterval3);
        }
    });


    const toDownGold = () => {
        if (indexGold === goldRank.length-1) {
            setIndexGold(0);
        }
        else {
            setIndexGold(indexGold+1);
        }   
    }
    const toDownSilver = () => {
        if (indexSilver === silverRank.length-1) {
            setIndexSilver(0);
        }
        else {
            setIndexSilver(indexSilver+1);
        }  
    }
    const toDownDiamond = () => {
        if (indexDiamond === diamondRank.length-1) {
            setIndexDiamond(0);
        }
        else {
            setIndexDiamond(indexDiamond+1);
        }  
    }
    

    return (
        <div className="sponsors">
            <div className="gold">
                <div className="cup-gold">
                    <img className="image" src={gold} alt="gold" />
                </div>
                <div className="ava-spon" style={{backgroundImage: "url(" + goldRank[indexGold].image + ")"}}>
                </div>
                <p className="name-spon">{goldRank[indexGold].name}</p>
                <p className="khoa-spon">{goldRank[indexGold].khoa}</p>
                <i className="fa fa-angle-down control-sponsor"
                    onClick={toDownGold}
                ></i>
            </div>
            <div className="diamond">
            <div className="cup-diamond">
                <img className="image" src={diamond} alt="diamond" />
            </div>
                <div className="ava-spon" style={{backgroundImage: "url(" + diamondRank[indexDiamond].image + ")"}}>
                </div>
                <p className="name-spon">{diamondRank[indexDiamond].name}</p>
                <p className="khoa-spon">{diamondRank[indexDiamond].khoa}</p>
                <i className="fa fa-angle-down control-sponsor"
                    onClick={toDownDiamond}
                ></i>
            </div>
            <div className="silver">
            <div className="cup-silver">
                <img className="image" src={silver} alt="silver" />
            </div>
                <div className="ava-spon" style={{backgroundImage: "url(" + silverRank[indexSilver].image + ")"}}>
                </div>
                <p className="name-spon">{silverRank[indexSilver].name}</p>
                <p className="khoa-spon">{silverRank[indexSilver].khoa}</p>
                <i className="fa fa-angle-down control-sponsor"
                    onClick={toDownSilver}
                ></i>
            </div>
        </div>
    )
}

