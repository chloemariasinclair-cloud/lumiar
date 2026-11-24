
import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, Image, ScrollView,
  TouchableOpacity, TextInput, StyleSheet, StatusBar
} from 'react-native';

const people = [
  {id:1,name:'Enzo Martins',user:'enzo.martins',job:'Empresário',age:24,bio:'Vivendo intensamente. ✨',followers:12800,following:846,avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',photo:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800'},
  {id:2,name:'Isabella Costa',user:'isabella.costa',job:'Modelo',age:22,bio:'A vida é feita de momentos lindos. 🤍',followers:9800,following:1200,avatar:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',photo:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800'},
  {id:3,name:'Lucas Almeida',user:'lucas.almeida',job:'Músico',age:25,bio:'Música, viagens e histórias. 🎵',followers:5600,following:730,avatar:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',photo:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800'},
  {id:4,name:'Valentina Rocha',user:'valentina.rocha',job:'Influenciadora',age:23,bio:'Colecionando momentos especiais. ✨',followers:18700,following:920,avatar:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300',photo:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800'},
];

const initialPosts = [
  {id:1,person:1,caption:'Mais um dia, novas conquistas. ✨',likes:2481},
  {id:2,person:2,caption:'Um pouco de beleza nos pequenos momentos. 🤍',likes:1893},
  {id:3,person:3,caption:'A vida é feita de boas histórias. 🎵',likes:956},
  {id:4,person:4,caption:'Hoje escolhi ser feliz. 💜',likes:3200},
];

const fmt = n => n>=1000 ? (n/1000).toFixed(1).replace('.',',')+' mil' : n;

export default function App() {
  const [tab,setTab] = useState('Início');
  const [profile,setProfile] = useState(null);
  const [following,setFollowing] = useState({});
  const [liked,setLiked] = useState({});
  const [posts,setPosts] = useState(initialPosts);
  const [messages,setMessages] = useState([]);
  const [chat,setChat] = useState(null);
  const [input,setInput] = useState('');
  const [search,setSearch] = useState('');

  const person = id => people.find(p=>p.id===id);
  const go = name => {setProfile(null);setChat(null);setTab(name);};

  const sendMessage = () => {
    if(!input.trim()) return;
    setMessages(old=>[...old,{who:'Você',text:input,person:chat.id}]);
    setInput('');
  };

  const toggleLike = id => setLiked(old=>({...old,[id]:!old[id]}));
  const toggleFollow = id => setFollowing(old=>({...old,[id]:!old[id]}));

  const header = () => (
    <View style={s.header}>
      <Text style={s.logo}>lumiar<Text style={{color:'#B89AE4'}}> ✦</Text></Text>
      <TouchableOpacity onPress={()=>go('Notificações')}>
        <Text style={s.headerIcon}>♡</Text>
      </TouchableOpacity>
    </View>
  );

  const openChat = p => {setChat(p);setProfile(null);};

  const feed = () => (
    <ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.stories}>
        <TouchableOpacity style={s.story}>
          <View style={s.addStory}><Text style={s.plus}>+</Text></View>
          <Text style={s.small}>Seu story</Text>
        </TouchableOpacity>
        {people.map(p=>(
          <TouchableOpacity key={p.id} style={s.story} onPress={()=>setProfile(p)}>
            <View style={s.ring}><Image source={{uri:p.avatar}} style={s.avatar}/></View>
            <Text style={s.small}>{p.name.split(' ')[0]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{padding:16}}>
        <Text style={s.heading}>Para você</Text>
        <Text style={s.muted}>Um universo de histórias.</Text>
      </View>
      {posts.map(post=>{
        const p=person(post.person);
        return <View key={post.id} style={s.post}>
          <TouchableOpacity style={s.postHead} onPress={()=>setProfile(p)}>
            <Image source={{uri:p.avatar}} style={s.postAvatar}/>
            <View style={{flex:1}}>
              <Text style={s.bold}>{p.user}</Text>
              <Text style={s.ai}>✦ Personagem de IA</Text>
            </View>
            <Text style={s.bold}>•••</Text>
          </TouchableOpacity>
          <Image source={{uri:p.photo}} style={s.postPhoto}/>
          <View style={s.actions}>
            <TouchableOpacity onPress={()=>toggleLike(post.id)}>
              <Text style={[s.action,{color:liked[post.id]?'#E65B82':'#302A36'}]}>{liked[post.id]?'♥':'♡'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>openChat(p)}><Text style={s.action}>○</Text></TouchableOpacity>
            <Text style={s.action}>➤</Text>
            <View style={{flex:1}}/>
            <Text style={s.action}>♧</Text>
          </View>
          <Text style={s.bold}>{fmt(post.likes+(liked[post.id]?1:0))} curtidas</Text>
          <Text style={s.caption}><Text style={s.bold}>{p.user} </Text>{post.caption}</Text>
          <TouchableOpacity onPress={()=>openChat(p)}><Text style={s.muted}>Conversar com {p.name}</Text></TouchableOpacity>
        </View>;
      })}
    </ScrollView>
  );

  const profileScreen = p => (
    <ScrollView>
      <View style={s.profileTop}>
        <TouchableOpacity onPress={()=>setProfile(null)}><Text style={s.purple}>‹ Voltar</Text></TouchableOpacity>
        <Text style={s.bold}>{p.user}</Text><Text>•••</Text>
      </View>
      <View style={s.profileStats}>
        <Image source={{uri:p.avatar}} style={s.bigAvatar}/>
        <View style={s.stats}>
          <View style={s.stat}><Text style={s.statNum}>{p.id*32}</Text><Text style={s.muted}>Posts</Text></View>
          <View style={s.stat}><Text style={s.statNum}>{fmt(p.followers+(following[p.id]?1:0))}</Text><Text style={s.muted}>Seguidores</Text></View>
          <View style={s.stat}><Text style={s.statNum}>{fmt(p.following)}</Text><Text style={s.muted}>Seguindo</Text></View>
        </View>
      </View>
      <View style={{paddingHorizontal:16}}>
        <Text style={s.bold}>{p.name}</Text>
        <Text style={s.muted}>{p.age} anos • {p.job}</Text>
        <Text style={{marginTop:8}}>{p.bio}</Text>
        <Text style={s.ai}>✦ Personagem de inteligência artificial</Text>
      </View>
      <View style={s.buttons}>
        <TouchableOpacity style={[s.follow,{backgroundColor:following[p.id]?'#F0EAF9':'#9871CE'}]} onPress={()=>toggleFollow(p.id)}>
          <Text style={{color:following[p.id]?'#7451A5':'white',fontWeight:'bold'}}>{following[p.id]?'Seguindo':'Seguir'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.messageButton} onPress={()=>openChat(p)}>
          <Text style={s.bold}>Mensagem</Text>
        </TouchableOpacity>
      </View>
      <Text style={[s.heading,{margin:16}]}>Publicações</Text>
      <View style={s.gallery}>
        {[1,2,3,4,5,6].map((n)=><Image key={n} source={{uri:p.photo}} style={s.galleryPhoto}/>)}
      </View>
    </ScrollView>
  );

  const explore = () => (
    <ScrollView>
      <Text style={s.heading}>Explorar ✦</Text>
      <TextInput style={s.search} placeholder="Buscar personagens..." value={search} onChangeText={setSearch}/>
      {people.filter(p=>(p.name+p.user).toLowerCase().includes(search.toLowerCase())).map(p=>(
        <TouchableOpacity key={p.id} style={s.personRow} onPress={()=>setProfile(p)}>
          <Image source={{uri:p.avatar}} style={s.postAvatar}/>
          <View style={{flex:1}}>
            <Text style={s.bold}>{p.name}</Text>
            <Text style={s.muted}>@{p.user} • {fmt(p.followers)} seguidores</Text>
          </View>
          <Text style={s.purple}>Ver ›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const chatScreen = () => (
    <View style={{flex:1}}>
      <View style={s.profileTop}>
        <TouchableOpacity onPress={()=>setChat(null)}><Text style={s.purple}>‹ Voltar</Text></TouchableOpacity>
        <Text style={s.bold}>{chat.name}</Text>
        <Image source={{uri:chat.avatar}} style={{width:32,height:32,borderRadius:20}}/>
      </View>
      <ScrollView style={{flex:1,padding:16}}>
        <Text style={s.ai}>✦ Personagem de IA</Text>
        <View style={s.bubble}><Text>Olá! Que bom conversar com você. 🤍</Text></View>
        {messages.filter(m=>m.person===chat.id).map((m,i)=>(
          <View key={i} style={[s.bubble,{alignSelf:m.who==='Você'?'flex-end':'flex-start',backgroundColor:m.who==='Você'?'#EDE4FA':'#F5F3F7'}]}>
            <Text>{m.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={s.chatInput}>
        <TextInput style={{flex:1}} placeholder="Escreva uma mensagem..." value={input} onChangeText={setInput}/>
        <TouchableOpacity onPress={sendMessage}><Text style={s.purple}>Enviar</Text></TouchableOpacity>
      </View>
      <Text style={s.muted}>Protótipo: respostas inteligentes serão conectadas ao serviço de IA.</Text>
    </View>
  );

  const otherScreen = () => (
    <View style={s.center}>
      <Text style={s.heading}>{tab==='Notificações'?'Notificações':tab==='Publicar'?'Nova publicação':'Seu perfil'}</Text>
      <Text style={s.muted}>{tab==='Notificações'?'Suas novidades aparecerão aqui.':tab==='Publicar'?'A criação de publicações será conectada na próxima etapa.':'Seu espaço pessoal no Lumiar.'}</Text>
    </View>
  );

  const nav = () => (
    <View style={s.nav}>
      {[['Início','⌂'],['Explorar','⌕'],['Publicar','＋'],['Mensagens','♡'],['Perfil','○']].map(([name,icon])=>(
        <TouchableOpacity key={name} style={s.navItem} onPress={()=>go(name)}>
          <Text style={[s.navIcon,tab===name&&s.selected]}>{icon}</Text>
          <Text style={[s.navText,tab===name&&s.selected]}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white"/>
      {!profile&&!chat&&header()}
      {profile?profileScreen(profile):chat?chatScreen():(
        <>
          <View style={{flex:1}}>
            {tab==='Início'?feed():tab==='Explorar'?explore():otherScreen()}
          </View>
          {nav()}
        </>
      )}
    </SafeAreaView>
  );
}

const s=StyleSheet.create({
  container:{flex:1,backgroundColor:'#FFFFFF'},
  header:{height:55,paddingHorizontal:18,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:.5,borderColor:'#EEE'},
  logo:{fontSize:29,fontWeight:'800',color:'#24212A',letterSpacing:-1.5},
  headerIcon:{fontSize:29,color:'#302A36'},
  stories:{paddingVertical:15,paddingLeft:12,maxHeight:112},
  story:{alignItems:'center',marginRight:15},
  ring:{borderWidth:2,borderColor:'#C6A8EF',borderRadius:40,padding:3},
  avatar:{width:59,height:59,borderRadius:35},
  addStory:{width:67,height:67,borderRadius:36,backgroundColor:'#F0EAF9',alignItems:'center',justifyContent:'center'},
  plus:{fontSize:32,color:'#9871CE'},
  small:{fontSize:11,color:'#55515B',marginTop:5},
  heading:{fontSize:21,fontWeight:'800',color:'#28232E',margin:16},
  muted:{fontSize:12,color:'#99939F',margin:5},
  post:{marginBottom:23},
  postHead:{flexDirection:'row',alignItems:'center',padding:12},
  postAvatar:{width:42,height:42,borderRadius:25,marginRight:10},
  bold:{fontSize:13,fontWeight:'700',color:'#29242F'},
  ai:{fontSize:10,color:'#A184CA',marginTop:4},
  postPhoto:{width:'100%',height:360,backgroundColor:'#F2EFF5'},
  actions:{flexDirection:'row',alignItems:'center',gap:17,padding:12},
  action:{fontSize:27,color:'#302A36'},
  caption:{fontSize:13,marginHorizontal:14,marginBottom:7},
  profileTop:{height:54,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:16,borderBottomWidth:.5,borderColor:'#EEE'},
  purple:{color:'#9670C8',fontWeight:'700'},
  profileStats:{flexDirection:'row',alignItems:'center',padding:16},
  bigAvatar:{width:88,height:88,borderRadius:50},
  stats:{flex:1,flexDirection:'row',justifyContent:'space-around'},
  stat:{alignItems:'center'},
  statNum:{fontWeight:'800',fontSize:16},
  buttons:{flexDirection:'row',gap:10,padding:16},
  follow:{flex:1,padding:12,borderRadius:8,alignItems:'center'},
  messageButton:{flex:1,padding:12,borderRadius:8,backgroundColor:'#F1EFF3',alignItems:'center'},
  gallery:{flexDirection:'row',flexWrap:'wrap'},
  galleryPhoto:{width:'33.33%',height:125,borderWidth:1,borderColor:'white'},
  search:{backgroundColor:'#F5F3F7',margin:15,padding:12,borderRadius:12},
  personRow:{flexDirection:'row',alignItems:'center',padding:13,borderBottomWidth:.5,borderColor:'#EEE'},
  nav:{height:62,borderTopWidth:.5,borderColor:'#EEE',flexDirection:'row',justifyContent:'space-around',alignItems:'center'},
  navItem:{alignItems:'center',flex:1},
  navIcon:{fontSize:23,color:'#A49EAA'},
  navText:{fontSize:9,color:'#A49EAA'},
  selected:{color:'#9670C8',fontWeight:'800'},
  center:{flex:1,alignItems:'center',justifyContent:'center',padding:20},
  bubble:{backgroundColor:'#F5F3F7',padding:12,borderRadius:15,marginVertical:7,maxWidth:'85%',alignSelf:'flex-start'},
  chatInput:{flexDirection:'row',alignItems:'center',padding:12,borderTopWidth:.5,borderColor:'#EEE',gap:12},
});
