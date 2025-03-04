import style from './PhoneContacts.module.scss';

const PhoneContacts = ({className, children} : {className:string, children:string[]}) => {

    function changeChildren(string:string){
        return string.split(' ').join('')
    }
    
    return (
        <>
        {children.map((item) => (
            <a key={item} href={`tel:${changeChildren(item)}`} className={`${style['contacts-item-phone']} ${className}`}>
            {item}
        </a>
        ))}
            
        </>
    );
};

export default PhoneContacts;