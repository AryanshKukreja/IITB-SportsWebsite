<div className='cardslist'>
          <div className="card" onClick={toggleContent}>
            <h3 className="card-heading">Camps</h3>
            {isContentVisible && (
              <p className="card-content">
                Every summer, by popular demand, our coach, Ritesh Guchhait, holds camps in swimming at the beginners, intermediate and advanced levels. Camps are also held for IIT students during the semester.The beginners camps are held separately for children, ladies, students and staff. The duration is normally 15-20 days, and there is a demonstration for parents and families on the last day, when certificates are handed out. The Intermediate camp is open to anyone who has completed the prescribed 40 laps in the beginners. In this camp, they are taught, the breaststroke, the butterfly stroke and the backstroke.
              </p>
            )}
          </div>
          <div className="card" onClick={toggleContent}>
            <h3 className="card-heading">NSO</h3>
            {isContentVisible && (
              <p className="card-content">
                The Government of India, through its National Sports Organization, provides a scheme in all IITs, where all incoming, i.e. first year students, must sign up for a particular sport, and undergo training. This scheme, popularly called NSO, is available to IIT students for training in various sports, such as swimming, hockey, basketball, squash, badminton, tennis, athletics, table tennis, football etc.
                Swimming, is a much sought after option, and since the number of students that can be accommodated in a given sport is limited, it is not surprising to see students, at the beginning of every academic year, crowding around the coach at the poolside, to give their trials and try to get in.
                What is extremely encouraging, is that students often develop a new interest in swimming, and continue to attend advanced coaching throughout the year, all through their college life, and not just the first year.
                The NSO swim training functions two evenings a week, and each session stretches to a couple of hours.
              </p>
            )}
          </div>
          <div className="card" onClick={toggleContent}>
            <h3 className="card-heading"> Swimmathon </h3>
            {isContentVisible && (
              <p className="card-content">
                Swimathon is the largest Event organised by IIT Bombay Swimming Club and is held annually during the end of Spring season. Swimathon started in 1989 and was initially supposed to be a 6 hour swimming marathon, but owing to the response and enthusiasm shown by the participants the duration was changed to 12 hours.
                Its open to everyone on campus, and one can see hoards of IIT students participating quite happily along with kids, professors and middle-aged ladies.
                Over the years, Swimathon has grown exponentially and now attracts 100+ participants every year.
              </p>
            )}
          </div>
          <div className="card" onClick={toggleContent}>
            <h3 className="card-heading">Swimming GC</h3>
            {isContentVisible && (
              <p className="card-content">
                Every year we have an Inter hostel swimming competition - The Swimming General Championship, with assorted supporters crying themselves hoarse in support of their hostel mates, irrespective of the level of swimming. It's an ideal platform to flaunt your swimming skills and make your hostel proud!
                With no restrictions on participation, the swimming pool is the place to be during the days of the swimming GC.
              </p>
            )}
          </div>
          <div className="card" onClick={toggleContent}>
            <h3 className="card-heading">Triathlon</h3>
            {isContentVisible && (
              <p className="card-content">
                The IIT Swimming club holds triathlon competition every year. This tri sport of event includes swimming, cycling, and running.
                The event is organized in two categories:
                Team Triathlon- Team of 3 (at least one female member)
                Individual Triathlon
              </p>
            )}
          </div>
          <div className="card" onClick={toggleContent}>
            <h3 className="card-heading">Waterpolo GC</h3>
            {isContentVisible && (
              <p className="card-content">
                Every year we have an inter hostel water polo general championship where all the hostels battle to prove their supremacy in the sport.
                The GC is organized according to the rules of FINA.
                You can find the GC rulebook here.
              </p>
            )}
          </div>
        </div>




        {/* <div className='cardslist'>
          {achieve.map((card, index) => (
            <div className={`card ${expandedCard === index ? 'expanded' : ''}`}
            key={index} onClick={() => toggleContent(index)}>
              <h3 className="card-heading">{card.title}</h3>
              {expandedCard === index && (
                <p className="card-content">
                  {card.content}
                </p>
              )}
            </div>
          ))}
        </div> */}
        {/* <div className='achieveflip'>
          <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
            <div className='acard' onClick={flipcad}>
             <p className='fronthead'>team achievement</p>
            </div>
            <div className='acard cardback' onClick={flipcad}>
              <h1></h1>
            </div>
         </ReactCardFlip>
          <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped1}>
            <div className='acard' onClick={flipcad1}>
              <p className='fronthead'>individual achievement</p>
            </div>
            <div className='acard cardback' onClick={flipcad1}>
              <h1></h1>
            </div>
          </ReactCardFlip>
        </div> */}