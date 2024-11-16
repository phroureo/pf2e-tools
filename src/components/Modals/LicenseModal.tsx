import Modal from "./Modal"

interface LicenseModalProps {
    isLicenseModalOpen: boolean;
    closeModal: () => void;
}

const LicenseModal: React.FC<LicenseModalProps> = ({ isLicenseModalOpen, closeModal }) => {
    return (
        <Modal
            isOpen={isLicenseModalOpen}>
            <div className='modal-body'>
                <div style={{ padding: "20px", overflowY: "scroll" }}>
                    <div>
                        <div className="rounded-rectangle">
                            <div>
                                <h2>ORC Notice</h2>
                            </div>
                            <div>
                                <p>This product is licensed under the ORC License to be held in the Library of Congress and available online at various locations including <a href="https://paizo.com/orclicense">paizo.com/orclicense</a>, <a href="https://azoralaw.com/orclicense">azoralaw.com/orclicense</a>, and others. All warranties are disclaimed as set forth therein.</p>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>Rulebooks</h2>
                            <div className="book-section">
                                <div className="book-name">
                                    Howl of the Wild
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Howl of the Wild © 2024 Paizo Inc. Authors: Kate Baker, Joshua Birdsong, Rigby Bendele, Chris Bissette, Jeremy Blum, Logan Bonner, Dan Cascone, James Case, Jessica Catalan, Brite Cheney, Rue Dickey, Caryn DiMarco, Matthew Fu, Leo Glass, Steven Hammond, Patrick Hurley, Michelle Y. Kim, Dustin Knight, Kendra Leigh Speedling, Christiana Lewis, Jessie “Aki” Lo, Luis Loza, Letterio Mammoliti, Jonathan “Ryomasa” Mendoza, Quinn Murphy, Dave Nelson, Mikhail Rekun, Kai Revius, Ember Rose, Simone D. Sallé, Michael Sayre, Shay Snow, Levi Steadman, Kyle Tam, Ruvaid Virk, and Andrew White</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    GM Core
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder GM Core © 2023 Paizo Inc., Designed by Logan Bonner and Mark Seifter. Authors: Amirali Attar Olyaee, Logan Bonner, Creighton Broadhurst, Jason Bulmahn, James Case, Jesse Decker, Eleanor Ferron, Fabby Garza Marroquín, Jaym Gates, Matthew Goetz, James Jacobs, Brian R. James, Jenny Jarzabski, Dustin Knight, Jason LeMaitre, Lyz Liddell, Luis Loza, Ron Lundeen, Stephen Radney-MacFarland, David N. Ross, Michael Sayre, Mark Seifter, Owen K.C. Stephens, Amber Stewart, Clark Valentine, Landon Winkler, and Linda Zayas-Palmer</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Player Core
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Player Core © 2023 Paizo Inc., Designed by Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter. Authors: Alexander Augunas, Kate Baker, Logan Bonner, Jason Bulmahn, Carlos Cabrera, Calder CaDavid, James Case, Eleanor Ferron, Steven Hammond, Joan Hong, Vanessa Hoskins, James Jacobs, Jenny Jarzabski, Erik Keith, Dustin Knight, Lyz Liddell, Luis Loza, Patchen Mortimer, Dennis Muldoon, Stephen Radney-MacFarland, Mikhail Rekun, David N. Ross, Michael Sayre, Mark Seifter, Kendra Leigh Speedling, Mark Thompson, Clark Valentine, Andrew White, Landon Winkler, and Linda Zayas-Palmer</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Monster Core
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Monster Core © 2024 Paizo Inc., Authors: Alexander Augunas, Dennis Baker, Kate Baker, Joshua Birdsong, Joseph Blomquist, Logan Bonner, Jason Bulmahn, James Case, John Compton, Paris Crenshaw, Adam Daigle, Darrin Drader, Brian Duckwitz, Robert N. Emerson, Scott Fernandez, Eleanor Ferron, Leo Glass, Matthew Goodall, BJ Hensley, Thurston Hillman, Vanessa Hoskins, James Jacobs, Jenny Jarzabski, Miko Kallio, Jason Keeley, Jeff Lee, Lyz Liddell, Luis Loza, Ron Lundeen, Robert G. McCreary, Philippe-Antoine Menard, Jacob W. Michaels, Dave Nelson, Jason Nelson, Tim Nightengale, Stephen Radney-MacFarland, Mikhail Rekun, Patrick Renie, Alex Riggs, David N. Ross, Michael Sayre, Mark Seifter, Chris S. Sims, Amber Stewart, Jeffrey Swank, William Thompson, Jason Tondro, Clark Valentine, Landon Winkler, Tonya Woldridge, and Linda Zayas-Palmer</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Player Core 2
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Player Core 2 © 2024, Paizo Inc.; Authors: Amirali Attar Olyaee, Alexander Augunas, Brian Bauman, Joshua Birdsong, Logan Bonner, Jason Bulmahn, James Case, Jessica Catalan, John Compton, Paris Crenshaw, Jesse Decker, Eleanor Ferron, Fabby Garza Marroquín, Steven Hammond, Sasha Laranoa Harving, Joan Hong, Nicolas Hornyak, Vanessa Hoskins, James Jacobs, Jason Keeley, Dustin Knight, Avi Kool, Lyz Liddell, Nicolas Logue, Luis Loza, Ron Lundeen, Patchen Mortimer, Stephen Radney‑MacFarland, Jessica Redekop, Mikhail Rekun, Alex Riggs, David N. Ross, Michael Sayre, Mark Seifter, Owen K.C. Stephens, Jason Tondro, Clark Valentine, Andrew White, Landon Winkler, and Tonya Woldridge.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Pathfinder War of Immortals
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder War of Immortals © 2024 Paizo Inc., Authors: James Case, Liane Merciel, and Michael Sayre. Additional writing by Jessica Catalan, Matt Chapmond, Steven Hammond, Steven T. Helt, Brent Holtsberry, Jason Keeley, Michelle Y. Kim, Luis Loza, Erik Mona, AJ Neuro, Joaquin Kyle “Makapatag” Saavedra, Tony Saunders, Andrew Stoeckle, Greg A. Vaughan, and Ruvaid Virk.</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>Lost Omens</h2>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Tian Xia Character Guide
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Lost Omens Tian Xia Character Guide © 2024, Paizo Inc.; Authors: Eren Ahn, Jeremy Blum, Logan Bonner, Alyx Bui, James Case, Banana Chan, Rick Chia, Hiromi Cota, Dana Ebert, Eleanor Ferron, Basheer Ghouse, John Godek III, Sen H.H.S., Joan Hong, Daniel Kwan, Jacky Leung, Jesse J. Leung, Monte Lin, Jessie “Aki” Lo, Adam Ma, Ashley Moni, Collette Quach, Christopher Rondeau, Joaquin Kyle “Makapatag” Saavedra, Michael Sayre, Shahreena Shahrani, Kienna Shaw, Philip Shen, Tan Shao Han, Mari Tokuda, Ruvaid Virk, Viditya Voleti, Grady Wang, and Jay Zhang</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Divine Mysteries
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Lost Omens Divine Mysteries © 2024, Paizo Inc.; Authors: Misha Bushyager, Jessica Catalan, Carlos Cisco, Rue Dickey, Brian Duckwitz, Aoife Ester, Eleanor Ferron, Ivis K. Flanagan, Tomas Gimenez Rioja, Leo Glass, Alastor Guzman, Thurston Hillman, Laura Lynn Horst, James Jacobs, Jason Keeley, Michelle Y. Kim, Monte Lin, Luis Loza, Stephanie Lundeen, Poorna M., Adam Ma, Jacob W. Michaels, Jaime Reyes Mondragon, Zac Moran, Jon Morgantini, Matt Morris, Morgan Nuncio, Kevin Thien Vu Long Nguyen, Daniel “Drakoniques” Oleh, Pam Punzalan, Jessica Redekop, Erin Roberts, quinn b. rodriguez, Michael Sayre, Mark Seifter, Austin Taylor, Isis Wozniakowska, and Sebastian Yū̄e</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>Adventure Paths</h2>
                            <div>
                                <div className="ap-name">
                                    SEASON OF GHOSTS
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #196: The Summer That Never Was
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #196: The Summer That Never Was © 2023, Paizo Inc.; Authors: Sen H.H.S, with James Jacobs.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #197: Let the Leaves Fall
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #197: Let the Leaves Fall © 2023, Paizo Inc.; Authors: Joan Hong with James Jacobs, Tan Shao Han, and Grady Wang.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #198: No Breath to Cry
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #198: No Breath to Cry © 2023, Paizo Inc.; Authors: Dan Cascone and Eleanor Ferron, with Jeremy Blum, Dana Ebert, Joshua Kim, and Michelle Kim.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #199: To Bloom Below the Web
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #199: To Bloom Below the Web © 2024, Paizo Inc.; Authors: Liane Merciel, with Jeremy Blum, Joshua Kim, and Michelle Kim.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    SEVEN DOOMS FOR SANDPOINT
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #200: Seven Dooms for Sandpoint
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #200: Seven Dooms for Sandpoint © 2024, Paizo Inc.; Author: James Jacobs.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    WARDENS OF WILDWOOD
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #201: Pactbreaker
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #201: Pactbreaker © 2024, Paizo Inc.; Authors: Andrew White, with John Compton, Josh Foster, and Diego Valdez.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #202: Severed at the Root
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #202: Severed at the Root © 2024, Paizo Inc.; Authors: Jessica Catalan, with John Compton and Alexi Greer</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #203: Shepherd of Decay
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #203: Shepherd of Decay © 2024, Paizo Inc.; Authors: Mike Kimmel, with Logan Bonner, Jessica Catalan, John Compton, and Sen H.H.S.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    CURTAIN CALL
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #204: Stage Fright
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #204: Stage Fright © 2024, Paizo Inc.; Authors: Richard Pett, with Rue Dickey, Sasha Laranoa Harving, Katrina Hennessy, James Jacobs, Dave Nelson, and Isis Wozniakowska.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #205: Singer, Stalker, Skinsaw Man
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #205: Singer, Stalker, Skinsaw Man © 2024, Paizo Inc.; Authors: Kendra Leigh Speedling, with Minty Belmont, James Jacobs, Chesley Oxendine, and Isabelle Thorne.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #206: Bring the House Down
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #206: Bring the House Down © 2024, Paizo Inc.; Authors: Sen H.H.S.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    TRIUMPH OF THE TUSK
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #207: The Resurrection Flood
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #207: The Resurrection Flood © 2024, Paizo Inc.; Authors: Brian Duckwitz, with John Compton and Michelle Y. Kim.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>One-shots, scenarios, and other sources</h2>
                            <div className="book-section">
                                <div className="book-name">
                                    Pathfinder Society Scenario #6-05: Silver Bark, Golden Blades
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Society Scenario #6-05: Silver Bark, Golden Blades © 2024, Paizo Inc. Author: Hilary Moon Murphy.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Prey for Death
                                </div>
                                <div className="book-details">
                                    <p>Prey for Death © 2024, Paizo Inc.; Authors: Vanessa Hoskins, James Jacobs, Nicolas Logue, and Robert G. McCreary.</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>OPEN GAME LICENSE Version 1.0a</h2>
                            <p>The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc ("Wizards"). All Rights Reserved.</p>
                            <p>1. Definitions: (a)"Contributors" means the copyright and/or trademark owners who have contributed Open Game Content; (b)"Derivative Material" means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted; (c) "Distribute" means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute; (d)"Open Game Content" means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity. (e) "Product Identity" means product and product line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which specifically excludes the Open Game Content; (f) "Trademark" means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor (g) "Use", "Used" or "Using" means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content. (h) "You" or "Your" means the licensee in terms of this agreement.</p>
                            <p>2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.</p>
                            <p>3. Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.</p>
                            <p>4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.</p>
                            <p>5. Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.</p>
                            <p>6. Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder's name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.</p>
                            <p>7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.</p>
                            <p>8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.</p>
                            <p>9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.</p>
                            <p>10. Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You Distribute.</p>
                            <p>11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.</p>
                            <p>12. Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.</p>
                            <p>13. Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.</p>
                            <p>14. Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.</p>
                            <p>15. COPYRIGHT NOTICE</p>
                            <p>Open Game License v 1.0 Copyright 2000, Wizards of the Coast, Inc.</p>
                            <p>System Reference Document. Copyright 2000. Wizards of the Coast, Inc; Authors: Jonathan Tweet, Monte Cook, Skip Williams, based on material by E. Gary Gygax and Dave Arneson.</p>
                        </div>
                        {/* Core Rulebooks */}
                        <div className="rounded-rectangle">
                            <h2>Rulebooks</h2>
                            <div className="book-section">
                                <div className="book-name">
                                    Advanced Player's Guide
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Pathfinder Advanced Player’s Guide © 2020, Paizo Inc.; Authors: Amirali Attar Olyaee, Alexander Augunas, Kate Baker, Brian Bauman, Logan Bonner, Carlos Cabrera, James Case, Jessica Catalan, John Compton, Paris Crenshaw, Jesse Decker, Fabby Garza Marroquín, Steven Hammond, Sasha Laranoa Harving, Joan Hong, Nicolas Hornyak, Vanessa Hoskins, James Jacobs, Erik Keith, Lyz Liddell, Luis Loza, Ron Lundeen, Patchen Mortimer, Dennis Muldoon, Stephen Radney-MacFarland, Jessica Redekop, Mikhail Rekun, Alex Riggs, David N. Ross, Michael Sayre, Mark Seifter, Kendra Leigh Speedling, Jason Tondro, Clark Valentine, and Andrew White.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Book of the Dead
                                </div>
                                <div className="book-details">
                                    <p>Demon Lord, Orcus from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene and Clark Peterson, based on material by Gary Gygax.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Book of the Dead © 2022, Paizo Inc.; Authors: Brian Bauman, Tineke Bolleman. Logan Bonner, Jason Bulmahn, Jessica Catalan, John Compton, Chris Eng, Logan Harper, Michelle Jones, Jason Keeley, Luis Loza, Ron Lundeen, Liane Merciel, Patchen Mortimer, Quinn Murphy, Jessica Redekop, Mikhail Rekun, Solomon St. John, Michael Sayre, Mark Seifter, Sen.H.H.S., Kendra Leigh Speedling, Jason Tondro, Andrew White.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Core Rulebook
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Designers: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Dark Archives
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Dark Archive © 2022, Paizo Inc.; Authors: Rigby Bendele, Logan Bonner, James Case, Dan Cascone, Jessica Catalan, Banana Chan, Kay Hashimoto, Sen H.H.S., Patrick Hurley, Joshua Kim, Avi Kool, Daniel Kwan, Kendra Leigh Speedling, Luis Loza, Ron Lundeen, Liane Merciel, Jacob W. Michaels, Andrew Mullen, Quinn Murphy, K. Tessa Newton, Mikhail Rekun, Patrick Renie, Solomon St. John, Michael Sayre, Mark Seifter, Shay Snow, Alex Speidel, Geoffrey Suthers, Ruvaid Virk, Jabari Weathers, and Isis Wozniakowska.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Gamesmastery Guide
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure Path #152: Legacy of the Lost God © 2020, Paizo Inc.; Authors: Jenny Jarzabski, with Stephen Glicker, Luis Loza, Ron Lundeen, Andrew Mullen, and David N. Ross.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Guns & Gears
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Guns & Gears © 2021, Paizo Inc.; Authors: Logan Bonner, Jessica Catalan, John Compton, Andrew D. Geels, Steven Hammond, Sen H.H.S., Brent Holtsberry, Jason Keeley, Dustin Knight, Luis Loza, Ron Lundeen, Chris Mastey, Liane Merciel, Jacob W. Michaels, Dave Nelson, Samantha Phelan, Mikhail Rekun, Stephen Radney-MacFarland, Sydney Meeker, Kendra Leigh Speedling, Michael Sayre., Mark Seifter, Andrew Stoeckle, Calliope Lee Taylor, Andrew White, and Scott D. Young.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Rage of Elements
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Rage of Elements © 2023, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, James Case, Jessica Catalan, Andrew D. Geels, Sen H.H.S., Patrick Hurley, Jason Keeley, Luis Loza, Mark Moreland, Jonathan Morgantini, AJ Neuro, Jessica Redekop, Solomon St. John, Michael Sayre, Mark Seifter, Shahreena Shahrani, Shay Snow, Levi Steadman, Mari Tokuda, Ruvaid Virk, Andrew White, and Linda Zayas-Palmer.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Secrets of Magic
                                </div>
                                <div className="book-details">
                                    <p>Angel, Monadic Deva from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Angel, Movanic Deva from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Daemon, Guardian from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowall.</p>
                                    <p>Daemon, Piscodaemon from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Demon, Nabasu from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Demon, Shadow from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Neville White.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Secrets of Magic © 2021, Paizo Inc.; Authors: Amirali Attar Olyaee, Kate Baker, Minty Belmont, Logan Bonner, James Case, Jessica Catalan, John Compton, Katina Davis, Jesse Decker, Chris Eng, Eleanor Ferron, Leo Glass, Joan Hong, Vanessa Hoskins, Jason Keeley, Joshua Kim, Luis Loza, Ron Lundeen, Liane Merciel, David N. Ross, Ianara Natividad, Chesley Oxendine, Stephen Radney-MacFarland, Shiv Ramdas, Mikhail Rekun, Simone D. Sallé, Michael Sayre, Mark Seifter, Sen H.H.S., Shay Snow, Kendra Leigh Speedling, Tan Shao Han, Calliope Lee Taylor, Mari Tokuda, Jason Tondro, Clark Valentine, Ruvaid Virk, Andrew White, Landon Winkler, Tonya Woldridge, and Isis Wozniakowska.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Treasure Vault
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Treasure Vault © 2023, Paizo Inc.; Authors: Michael Sayre, Mark Seifter, Kendra Leigh Speedling, Logan Bonner, Dan Cascone, Jessica Catalan, Kim Frandsen, Andrew Geels, Steven Hammond, Sen H.H.S., Joshua Kim, Dustin Knight, Luis Loza, Jacob W. Michaels, Matt Morris, Dave Nelson, Stephen Radney-McFarland, Jessica Redekop, Andrew Stoeckle, Mari Tokuda, and Andrew White.</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>Lost Omens</h2>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Absalom, City of Lost Omens
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens Absalom, City of Lost Omens © 2021, Paizo Inc.; Authors: Allie Bustion, John Compton, Jeremy Corff, Katina Davis, Vanessa Hoskins, James Jacobs, Virginia Jordan, Erik Mona, Matt Morris, Liane Merciel, Dave Nelson, Samantha Phelan, Jessica Redekop, Mikhail Rekun, Brian Richmond, David N. Ross, Simone D. Sallé, Shahreena Shahrani, Abigail Slater, Chris Spivey, Diego Valdez, and Skylar- James Wall.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Ancestry Guide
                                </div>
                                <div className="book-details">
                                    <p>The Book of Fiends © 2003, Green Ronin Publishing; Authors: Aaron Loeb, Erik Mona, Chris Pramas, and Robert J. Schwalb. Armies of the Abyss © 2002, Green Ronin Publishing; Authors: Erik Mona and Chris Pramas.</p>
                                    <p>The Avatar's Handbook © 2003, Green Ronin Publishing; Authors: Jesse Decker and Chris Thomasson.</p>
                                    <p>Book of the Righteous © 2002, Aaron Loeb. Legions of Hell © 2001, Green Ronin Publishing; Author: Chris Pramas.</p>
                                    <p>The Unholy Warrior's Handbook © 2003, Green Ronin Publishing; Author: Robert J. Schwalb.</p>
                                    <p>Dragon, Faerie from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Grippli from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens Ancestry Guide (Second Edition) © 2021, Paizo Inc.; Authors: Calder CaDavid, James Case, Jessica Catalan, Eleanor Ferron, Lyz Liddell, Luis Loza, Ron Lundeen, Patchen Mortimer, Andrew Mullen, Samantha Phelan, Jessica Redekop, Mikhail Rekun, David N. Ross, Mark Seifter, Owen K.C. Stephens, Isabelle Thorne, and Linda Zayas-Palmer.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Character Guide
                                </div>
                                <div className="book-details">
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Pathfinder Lost Omens Character Guide (Second Edition) © 2019, Paizo Inc.; Authors: John Compton, Sasha Lindley Hall, Amanda Hamon, Mike Kimmel, Luis Loza, Ron Lundeen, Matt Morris, Patchen Mortimer, Andrew Mullen, Mikhail Rekun, Micheal Sayre, Owen K.C. Stephens, Isabelle Thorne, and Linda Zayas-Palmer.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Firebrands
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens Firebrands © 2023, Paizo Inc.; Authors: James Beck, Rigby Bendele, Jessica Catalan, Dana Ebert, Sen H.H.S., Joan Hong, Aaron Lascano, Luis Loza, Ron Lundeen, Stephanie Lundeen, Matt Morris, Jessica Redekop, Erin Roberts, Michael Sayre, Shahreena Shahrani, and Ruvaid Virk.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Gods & Magic
                                </div>
                                <div className="book-details">
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Pathfinder Lost Omens Gods & Magic (Second Edition) © 2020, Paizo Inc.; Authors: Robert Adducci, Amirali Attar Olyaee, Calder CaDavid, James Case, Adam Daigle, Katina Davis, Leo Glass, Joshua Grinlinton, James Jacobs, Virginia Jordan, Jason Keeley, Jacky Leung, Lyz Liddell, Ron Lundeen, Stephanie Lundeen, Jacob W. Michaels, Matt Morris, Dave Nelson, Samantha Phelan, Jennifer Povey, Jessica Redekop, Nathan Reinecke, Patrick Renie, David N. Ross, Simone D. Sallé, Michael Sayre, David Schwartz, Shahreena Shahrani, Isabelle Thorne, Marc Thuot, Jason Tondro, and Diego Valdez.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Highhelm
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens Highhelm © 2023, Paizo Inc.; Authors: Piper Amatrudi, Dan Cascone, Caryn DiMarco, Dana Ebert, Sen H.H.S., Michelle Jones, Stephanie Lundeen, Liane Merciel, Matt Morris, Dave Nelson, Mikhail Rekun, Erin Roberts, Owen K.C. Stephens, Andrew White, and Shan Wolf</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Impossible Lands
                                </div>
                                <div className="book-details">
                                    <p>Basidirond from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax</p>
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Grippli from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens: Impossible Lands © 2022, Paizo Inc.; Authors: Mariam Ahmad, Saif Ansari, Alexandria Bustion, Basheer Ghouse, Michelle Jones, TJ Kahn, Matt Morris, Dave Nelson, Mikhail Rekun, Michael Sayre, Tan Shao Han, Ruvaid Virk, Jabari Weathers, and Brian Yaksha</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Knights of Lastwall
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens Knights of Lastwall © 2022, Paizo Inc.; Authors: Banana Chan, Jessica Catalan,</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Legends
                                </div>
                                <div className="book-details">
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens Legends © 2020, Paizo Inc.; Authors: Alexander Augunas, Kate Baker, Jason Bulmahn, Alexandria Bustion, Carlos Cabrera, Calder CaDavid, Jessica Catalan, Natalie Collazo, Ryan Costello, Greg Diaz, Fabby Garza Marroquín, Jaym Gates, Alice Grizzle, Steven Hammond, Nicolas Hornyak, James Jacobs, Michelle Jones, Kristina Sisto Kindel, Aaron Lascano, Ron Lundeen, Stephanie Lundeen, Sydney Meeker, Liane Merciel, Matt Morris, Patchen Mortimer, Hilary Moon Murphy, Dennis Muldoon, Andrew Mullen, Amirali Attar Olyaee, Mikhail Rekun, Michael Sayre, Mark Seifter, Ashton Sperry, Owen K.C. Stephens, and Isabelle Thorne</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Monsters of Myth
                                </div>
                                <div className="book-details">
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax. Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter. Pathfinder Lost Omens Monsters of Myth © 2021, Paizo Inc.; Authors: James Case, John Compton, Dana Ebert, Joshua Kim, Aaron Lascano, Luis Loza, Ron Lundeen, Stephanie Lundeen, Liane Merciel, Andrew Mullen, Michael Sayre, Sen H.H.S., Shay Snow, and Jason Tondro.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Pathfinder Society Guide
                                </div>
                                <div className="book-details">
                                    <p>The Book of Fiends © 2003, Green Ronin Publishing; Authors: Aaron Loeb, Erik Mona, Chris Pramas, and Robert J. Schwalb.</p>
                                    <p>Armies of the Abyss © 2002, Green Ronin Publishing; Authors: Erik Mona and Chris Pramas.</p>
                                    <p>The Avatar's Handbook © 2003, Green Ronin Publishing; Authors: Jesse Decker and Chris Thomasson.</p>
                                    <p>Book of the Righteous © 2002, Aaron Loeb.</p>
                                    <p>Legions of Hell © 2001, Green Ronin Publishing; Author: Chris Pramas.</p>
                                    <p>The Unholy Warrior's Handbook © 2003, Green Ronin Publishing; Author: Robert J. Schwalb.</p>
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Dragon, Faerie from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Brian Jaeger and Gary Gygax.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens Pathfinder Society Guide © 2020, Paizo Inc.; Authors: Kate Baker, James Case, John Compton, Vanessa Hoskins, Mike Kimmel, Ron Lundeen, Dennis Muldoon, kieran t. newton, Michael Sayre, Clark Valentine, Tonya Woldridge, and Linda Zayas-Palmer</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: The Grand Bazaar
                                </div>
                                <div className="book-details">
                                    <p>Dragon, Faerie from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens Grand Bazaar © 2021, Paizo Inc.; Authors: Tineke Bolleman, Logan Bonner, Jessica Catalan, Dominique Dickey, Dana Ebert, Steven Hammond, Sen H.H.S., Dustin Knight, Avi Kool, Aaron Lascano, Carlos Luna, Ron Lundeen, Sydney Meeker, Randal Meyer, Jacob Michaels, Matt Morris, Andrew Mullen, Ianara Natividad, Dave Nelson, Jessica Redekop, Nathan Reinecke, Erin Roberts, David N. Ross, Simone Sallé, Mark Seifter, Shay Snow, Ashton Sperry, Amber Stewart, Andrew Stoeckle, Isabelle Thorne, Jason Tondro, and Scott D. Young.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: The Mwangi Expanse
                                </div>
                                <div className="book-details">
                                    <p>Basidirond from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Demon, Nabasu from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Froghemoth from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Grippli from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Yellow Musk Creeper from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Albie Fiore.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens The Mwangi Expanse © 2021, Paizo Inc.; Authors: Laura-Shay Adams, Mariam Ahmad, Jahmal Brown, Misha Bushyager, Alexandria Bustion, Duan Byrd, John Compton, Sarah Davis, Naomi Fritts, Kent Hamilton, Sasha Laranoa Harving, Gabriel Hicks, TK Johnson, Michelle Jones, Joshua Kim, Travis Lionel, Ron Lundeen, Stephanie Lundeen, Hillary Moon Murphy, Lu Pellazar, Mikhail Rekun, Nate Wright, and Jabari Weathers.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: Travel Guide
                                </div>
                                <div className="book-details">
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Lost Omens Travel Guide © 2022, Paizo Inc.; Authors: Rigby Bendele, Katina Davis, Dana Ebert, Dustin Knight, Aaron Lascano, Ron Lundeen, Stephanie Lundeen, Ianara Natividad, Dave Nelson, Jessica Redekop, Nathan Reinecke, Mikhail Rekun, Erin Roberts, Simone Sallé, and Diego Valdez.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Lost Omens: World Guide
                                </div>
                                <div className="book-details">
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Pathfinder Lost Omens World Guide (Second Edition) © 2019, Paizo Inc.; Authors: Tanya DePass, James Jacobs, Lyz Liddell, Ron Lundeen, Liane Merciel, Erik Mona, Mark Seifter, James L. Sutter.</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>Adventure Paths</h2>
                            <div>
                                <div className="ap-name">
                                    AGE OF ASHES
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #145: Hellknight Hill
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #145: Hellknight Hill © 2019, Paizo Inc.; Authors: Amanda Hamon, with Logan Bonner, James Jacobs, and Jason Tondro.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #146: Cult of Cinders
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #146: Cult of Cinders © 2019, Paizo Inc.; Authors: Eleanor Ferron, with Leo Glass, James Jacobs, Jason Keeley, and Owen KC Stephens.</p>
                                        <p>Grippli from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #147: Tomorrow Must Burn
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #147: Tomorrow Must Burn © 2019, Paizo Inc.; Authors: Ron Lundeen and Stephanie Lundeen, with Lyz Liddell and James Sutter.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #148: Fires of the Haunted City
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #148: Fires of the Haunted City © 2019, Paizo Inc.; Authors: Linda Zayas-Palmer, with Owen K.C. Stephens, James L. Sutter, and Greg Vaughan.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #149: Against the Scarlet Triad
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #149: Against the Scarlet Triad © 2019, Paizo Inc.; Authors: John Compton, with Tim Nightengale and James L. Sutter.</p>
                                        <p>Pech from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #150: Broken Promises
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #150: Broken Promises © 2019, Paizo Inc.; Authors: Luis Loza, with James Jacobs, Alex Riggs, and Owen K.C. Stephens.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    EXTINCTION CURSE
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #151: The Show Must Go On
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #151: The Show Must Go On © 2020, Paizo Inc.; Authors: Jason Tondro, with Andrew Mullen, Patrick Renie, David N. Ross, and Michael Sayre.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #152: Legacy of the Lost God
                                    </div>
                                    <div className="book-details">
                                        <p>The Book of Fiends © 2003, Green Ronin Publishing; Authors: Aaron Loeb, Erik Mona, Chris Pramas, and Robert J. Schwalb.</p>
                                        <p>Armies of the Abyss © 2002, Green Ronin Publishing; Authors: Erik Mona and Chris Pramas.</p>
                                        <p>The Avatar’s Handbook © 2003, Green Ronin Publishing; Authors: Jesse Decker and Chris Thomasson.</p>
                                        <p>Book of the Righteous © 2002, Aaron Loeb.</p>
                                        <p>Legions of Hell © 2001, Green Ronin Publishing; Author: Chris Pramas.</p>
                                        <p>The Unholy Warrior’s Handbook © 2003, Green Ronin Publishing; Author: Robert J. Schwalb.</p>
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Gamemastery Guide © 2020, Paizo Inc.; Authors: Alexander Augunas, Jesse Benner, John Bennett, Logan Bonner, Clinton J. Boomer, Jason Bulmahn, James Case, Paris Crenshaw, Jesse Decker, Robert N. Emerson, Eleanor Ferron, Jaym Gates, Matthew Goetz, T.H. Gulliver, Kev Hamilton, Sasha Laranoa Harving, BJ Hensley, Vanessa Hoskins, Brian R. James, Jason LeMaitre, Lyz Liddell, Luis Loza, Colm Lundberg, Ron Lundeen, Stephen Radney-MacFarland, Jessica Redekop, Alistair Rigg, Mark Seifter, Owen K.C. Stephens, Amber Stewart, Christina Stiles, Landon Winkler, and Linda Zayas-Palmer.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #153: Life's Long Shadow
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>The Book of Fiends © 2003, Green Ronin Publishing; Authors: Aaron Loeb, Erik Mona, Chris Pramas, and Robert J. Schwalb.</p>
                                        <p>Armies of the Abyss © 2002, Green Ronin Publishing; Authors: Erik Mona and Chris Pramas.</p>
                                        <p>The Avatar’s Handbook © 2003, Green Ronin Publishing; Authors: Jesse Decker and Chris Thomasson.</p>
                                        <p>Book of the Righteous © 2002, Aaron Loeb.</p>
                                        <p>Legions of Hell © 2001, Green Ronin Publishing; Author: Chris Pramas.</p>
                                        <p>The Unholy Warrior’s Handbook © 2003, Green Ronin Publishing; Author: Robert J. Schwalb.</p>
                                        <p>Demon Lord, Jubilex from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on material by Gary Gygax.</p>
                                        <p>Demon Lord, Pazuzu from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #153: Life’s Long Shadows © 2020, Paizo Inc.; Authors: Greg A. Vaughan, with Anthony Bono, Jacob W. Michaels, Andrew Mullen, Patrick Renie, Alex Riggs, Timothy Snow, and Amber Stewart.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #154: Siege of the Dinosaurs
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>The Book of Fiends © 2003, Green Ronin Publishing; Authors: Aaron Loeb, Erik Mona, Chris Pramas, and Robert J. Schwalb.</p>
                                        <p>Armies of the Abyss © 2002, Green Ronin Publishing; Authors: Erik Mona and Chris Pramas.</p>
                                        <p>The Avatar’s Handbook © 2003, Green Ronin Publishing; Authors: Jesse Decker and Chris Thomasson.</p>
                                        <p>Book of the Righteous © 2002, Aaron Loeb.</p>
                                        <p>Legions of Hell © 2001, Green Ronin Publishing; Author: Chris Pramas.</p>
                                        <p>The Unholy Warrior’s Handbook © 2003, Green Ronin Publishing; Author: Robert J. Schwalb.</p>
                                        <p>Demon Lord, Pazuzu from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #154: Siege of the Dinosaurs © 2020, Paizo Inc.; Authors: Kate Baker, with Luis Loza, Andrew Mullen, Jason Nelson, Jennifer Povey, David Schwartz, and Amber Stewart.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #155: Lord of the Black Sands
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>The Book of Fiends © 2003, Green Ronin Publishing; Authors: Aaron Loeb, Erik Mona, Chris Pramas, and Robert J. Schwalb.</p>
                                        <p>Armies of the Abyss © 2002, Green Ronin Publishing; Authors: Erik Mona and Chris Pramas.</p>
                                        <p>The Avatar's Handbook © 2003, Green Ronin Publishing; Authors: Jesse Decker and Chris Thomasson.</p>
                                        <p>Book of the Righteous © 2002, Aaron Loeb.</p>
                                        <p>Legions of Hell © 2001, Green Ronin Publishing; Author: Chris Pramas.</p>
                                        <p>The Unholy Warrior's Handbook © 2003, Green Ronin Publishing; Author: Robert J. Schwalb.</p>
                                        <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #155: Lord of the Black Sands © 2020, Paizo Inc.; Authors: Mikko Kallio, with Andrew Mullen, Nathan Reinecke, David Schwartz, and Scott Young.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #156: The Apocalypse Prophet
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Demon Lord, Baphomet from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on material by Gary Gygax.</p>
                                        <p>Demon Lord, Pazuzu from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #156: The Apocalypse Prophet © 2020, Paizo Inc.; Authors: Lyz Liddell, with Kevin Bryan, Steven Hammond, Andrew Mullen, Mikhail Rekun, Patrick Renie, and David N. Ross.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    AGENTS OF EDGEWATCH
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #157: Devil at the Dreaming Palace
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Carbuncle from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Albie Fiore.</p>
                                        <p>Pathfinder Adventure Path #157: Devil at the Dreaming Palace © 2020, Paizo Inc.; Authors: James L. Sutter, with Luis Loza, Andrew Mullen, Samantha Phelan, and Patrick Renie.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #158: Sixty Feet Under
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Daemon, Guardian from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowall.</p>
                                        <p>Pathfinder Adventure Path #158: Sixty Feet Under © 2020, Paizo Inc.; Authors: Michael Sayre, with Saif Ansari, Leo Glass, Ron Lundeen, Jacob W. Michaels, Patrick Renie, and David N. Ross.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #159: All or Nothing
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Daemon, Piscodaemon from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #159: All or Nothing © 2020, Paizo Inc.; Authors: Jason Keeley, with Alexander Augunas, Jessica Catalan, Stephen Glicker, Mike Kimmel, Alex Riggs, and Mike Welham.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #160: Assault on Hunting Lodge Seven
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #160: Assault on Hunting Lodge Seven © 2020, Paizo Inc.; Authors: Ron Lundeen, with Luis Loza and Hilary Moon Murphy.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #161: Belly of the Black Whale
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #161: Belly of the Black Whale © 2020, Paizo Inc.; Authors: Cole Kronewitter, with Kim Frandsen, Patchen Mortimer, Kyle T. Raes, Andrew White, and Brian Yaksha.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #162: Ruins of the Radiant Siege
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #162: Ruins of the Radiant Siege © 2020, Paizo Inc.; Authors: Amber Stewart, with Carlos Cabrera, Benjamin U. Fields, Kim Frandsen, Jim Groves, John S. Roberts, and Diego Valdez.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    ABOMINATION VAULTS
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #163: Ruins of Gauntlight
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Soul Eater from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by David Cook.</p>
                                        <p>Pathfinder Adventure Path #163: Ruins of Gauntlight © 2021, Paizo Inc.; Author: James Jacobs.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #164: Hands of the Devil
                                    </div>
                                    <div className="book-details">
                                        <p>Skulk from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Muth.</p>
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #164: Hands of the Devil © 2021, Paizo Inc.; Authors: Vanessa Hoskins, with Ron Lundeen, Quinn Murphy, and Amber Stewart.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #165: Eyes of Empty Death
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Daemon, Guardian from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowall.</p>
                                        <p>Daemon, Derghodaemon from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Froghemoth from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #165: Eyes of Empty Death © 2021, Paizo Inc.; Authors: Stephen Radney- MacFarland, with James Jacobs and Mikhail Rekun.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    FISTS OF THE RUBY PHOENIX
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #166: Despair on Danger Island
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Daemon, Guardian from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowall.</p>
                                        <p>Daemon, Derghodaemon from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Froghemoth from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #165: Eyes of Empty Death © 2021, Paizo Inc.; Authors: Stephen RadneyMacFarland, with James Jacobs and Mikhail Rekun.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #167: Ready? Fight!
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #167: Ready? Fight! © 2021, Paizo Inc.; Authors: David N. Ross, with Joan Hong, Joshua Kim, Danita Rambo, Sen H.H.S., Tan Shao Han, and Ruvaid Virk.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #168: King of the Mountain
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #168: King of the Mountain © 2021, Paizo Inc.; Authors: James Case, with Joan Hong, Danita Rambo, David N. Ross, Amber Stewart, William Thompson, Ruvaid Virk, and Jabari Weathers.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    STRENGTH OF THOUSANDS
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #169: Kindled Magic
                                    </div>
                                    <div className="book-details">
                                        <p>Grippli from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #169: Kindled Magic © 2021, Paizo Inc.; Authors: Eleanor Ferron and Alexandria Bustion, with Shanyce Henley, Jenny Jarzabski, Jessica Redekop, and Mark Seifter.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #170: Spoken on the Song Wind
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Demon Lord, Jubilex from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Grippli from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #170: Spoken on the Song Wind © 2021, Paizo Inc.; Authors: Quinn Murphy, with James Case, Jessica Catalan, Brian Cortijo, Isaac Kerry, Dave Nelson, Lu Pellazar, and Shan Wolf.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #171: Hurricane's Howl
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Grippli from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #172: Secrets of the Temple-City © 2021, Paizo Inc.; Authors: Luis Loza, with Eleanor Ferron, John Godek III, and Shanyce Henley.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #172: Secrets of the Temple City
                                    </div>
                                    <div className="book-details">
                                        <p>Grippli from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #172: Secrets of the Temple-City © 2021, Paizo Inc.; Authors: Luis Loza, with Eleanor Ferron, John Godek III, and Shanyce Henley.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #173: Doorway to the Red Star
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #173: Doorway to the Red Star © 2021, Paizo Inc.; Author: Michael Sayre.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #174: Shadows of the Ancients
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #174: Shadows of the Ancients © 2021, Paizo Inc.; Authors: Saif Ansari, with Matt Hardin, Jacob W. Michaels, Matt Morris, Brendan Perry, Jessica Redekop, Nathan Reinecke, and Darren Spurrier.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    QUEST FOR THE FROZEN FLAME
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #175: Broken Tusk Moon
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #175: Broken Tusk Moon © 2022, Paizo Inc.; Authors: Ron Lundeen and Stephanie Lundeen.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #176: Lost Mammoth Valley
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Battlezoo Bestiary © 2021, Skyscraper Studios Inc.; Authors: Stephen Glicker, Patrick Renie, AND Mark Seifter</p>
                                        <p>Demon, Nabasu from Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax. Demon, Shadow from Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Neville White.</p>
                                        <p>Grippli from Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Adventure Path #176: Lost Mammoth Valley © 2022, Paizo Inc.; Author: Jessica Catalan.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #177: Burning Tundra
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Dracolisk from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Demon, Nabasu from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Demon, Shadow from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Neville White.</p>
                                        <p>Pathfinder Adventure Path #177: Burning Tundra © 2022, Paizo Inc.; Author: Jason Tondro.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    OUTLAWS OF ALKENSTAR
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #178: Punks in a Powderkeg
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #178: Punks in a Powder Keg © 2022, Paizo Inc.; Authors: Vanessa Hoskins, with Stephanie Lundeen and Matt Morris.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #179: Cradle of Quartz
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #179: Cradle of Quartz © 2022, Paizo Inc.; Authors: Scott D. Young and Ron Lundeen.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #180: The Smoking Gun
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #180: The Smoking Gun © 2022, Paizo Inc.; Author: Cole Kronewitter.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    BLOOD LORDS
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #182: Graveclaw
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #182: Graveclaw © 2022, Paizo Inc.; Author: Jason Tondro.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #183: Field of Maidens
                                    </div>
                                    <div className="book-details">
                                        <p>Demon, Shadow from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Neville White.Pathfinder Adventure Path #183: Field of Maidens © 2022, Paizo Inc.; Author: Jenny Jarzabski, with Ivis K. Flanagan, Sasha Laranoa Harving, and Randy Price.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #184: The Ghouls Hunger
                                    </div>
                                    <div className="book-details">
                                        <p>Demon, Nabasu from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #184: The Ghouls Hunger © 2022, Paizo Inc.; Authors: Leo Glass and James Jacobs</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #185: A Taste of Ashes
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder #185: A Taste of Ashes © 2022, Paizo Inc.; Authors: Leo Glass and James Jacobs</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #186: Ghost King's Rage
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #186: Ghost King's Rage © 2022, Paizo Inc.; Authors: Jessica Catalan, with Mike Kimmel.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    KINGMAKER
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Kingmaker Adventure Path
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Kingmaker Adventure Path © 2022, Paizo Inc.; Authors: Steve Helt, Tim Hitchcock, James Jacobs, Ron Lundeen, Rob McCreary, Jason Nelson, Richard Pett, Neil Spicer, and Greg A. Vaughan.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    GATEWALKERS
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #187: The Seventh Arch
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #187: The Seventh Arch © 2023, Paizo Inc.; Authors: James L. Sutter, with Patrick Renie.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #188: They Watched the Stars
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #188: They Watched the Stars © 2023, Paizo Inc.; Authors: Jason Keeley, with Ivis K. Flanagan.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #189: Dreamers of the Nameless Spires
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #189: Dreamers of the Nameless Spires © 2023, Paizo Inc.; Authors: James Jacobs, with Jacob W. Michaels and Rodney Sloan.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    STOLEN FATE
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder Adventure Path #190: The Choosing
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #190: The Choosing © 2023, Paizo Inc.; Authors: Ron Lundeen, with James Jacobs and Jason Tondro.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #191: The Destiny War
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #191: The Destiny War © 2023, Paizo Inc.; Authors: Chris S. Sims, with James Jacobs and Jason Tondro.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #192: Worst of All Possible Worlds
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Adventure Path #192: Worst of All Possible Worlds © 2023, Paizo Inc.; Authors: Luis Loza, with James Jacobs and Jason Tondro.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="ap-name">
                                    SKY KING'S TOMB
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #193: Mantle of Gold
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #193: Mantle of Gold © 2023, Paizo Inc.; Authors: John Compton, with Caryn DiMarco and Vanessa Hoskins.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #194: Cult of the Cave Worm
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #194: Cult of the Cave Worm © 2023, Paizo Inc.; Authors: Scott D. Young, with Vanessa Hoskins.</p>
                                    </div>
                                </div>
                                <div className="book-section">
                                    <div className="book-name">
                                        Pathfinder #195: Heavy is the Crown
                                    </div>
                                    <div className="book-details">
                                        <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                        <p>Pathfinder Adventure Path #195: Heavy is the Crown © 2023, Paizo Inc.; Authors: Jessica Catalan, with John Compton, Vanessa Hoskins, James Jacobs, Randy Price, and Linda Zayas-Palmer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>Standalone Adventures</h2>
                            <div className="book-section">
                                <div className="book-name">
                                    A Few Flowers More
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure: A Few Flowers More © 2023, Paizo Inc.; Authors: Linda Zayas-Palmer.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    A Fistful of Flowers
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure: A Fistful of Flowers © 2022, Paizo Inc.; Authors: Eleanor Ferron, Linda Zayas-Palmer.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Crown of the Kobold King
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Crown of the Kobold King © 2022, Paizo Inc.; Authors: Jason Bulmahn, Tim Hitchcock, Nicolas Logue, and F. Wesley Schneider.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Little Trouble in Big Absalom
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure: Little Trouble in Big Absalom © 2020, Paizo Inc.; Author: Eleanor Ferron.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Malevolence
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure: Malevolence © 2021, Paizo Inc.; Author: James Jacobs.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Night of the Gray Death
                                </div>
                                <div className="book-details">
                                    <p>Open Game License v 1.0a © 2000, Wizards of the Coast, Inc. Authors: Jonathan Tweet, Monte Cook, and Skip Williams, based on material by E. Gary Gygax and Dave Arneson</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure: Night of the Gray Death © 2021, Paizo Inc.; Author: Ron Lundeen.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Rusthenge
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Adventure: Rusthenge © 2023, Paizo Inc.; Author: Vanessa Hoskins.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Shadows at Sundown
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Adventure: Shadows at Sundown © 2022, Paizo Inc.; Author: Landon Winkler.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    The Enmity Cycle
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure: The Enmity Cycle © 2023, Paizo Inc.; Author: Brian Duckwitz.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    The Fall of Plaguestone
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Adventure: The Fall of Plaguestone © 2019, Paizo Inc.; Author: Jason Bulmahn.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    The Slithering
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure: The Slithering © 2020, Paizo Inc.; Author: Ron Lundeen.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Threshold of Knowledge
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure: Threshold of Knowledge © 2021, Paizo Inc.; Authors: Ron Lundeen, Jabari Weathers</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Troubles in Otari
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Adventure: Troubles in Otari © 2020, Paizo Inc.; Authors: Jason Keeley, Lyz Liddell, and Ron Lundeen.</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>Bestiaries</h2>
                            <div className="book-section">
                                <div className="book-name">
                                    Bestiary
                                </div>
                                <div className="book-details">
                                    <p>Daemon, Guardian from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowall.</p>
                                    <p>Dark Creeper from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Rik Shepard.</p>
                                    <p>Dark Stalker from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Muth.</p>
                                    <p>Dragon, Faerie from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Brian Jaeger and Gary Gygax.</p>
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Mite from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian Livingstone and Mark Barnes.</p>
                                    <p>Pathfinder Bestiary (Second Edition) © 2019, Paizo Inc.; Authors: Alexander Augunas, Logan Bonner, Jason Bulmahn, John Compton, Paris Crenshaw, Adam Daigle, Eleanor Ferron, Leo Glass, Thurston Hillman, James Jacobs, Jason Keeley, Lyz Liddell, Ron Lundeen, Robert G. McCreary, Tim Nightengale, Stephen Radney-MacFarland, Alex Riggs, David N. Ross, Michael Sayre, Mark Seifter, Chris S. Sims, Jeffrey Swank, Jason Tondro, Tonya Woldridge, and Linda Zayas-Palmer.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Bestiary 2
                                </div>
                                <div className="book-details">
                                    <p>Angel, Monadic Deva from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Aurumvorax from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Basidirond from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Blindheim from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Roger Musson.</p>
                                    <p>The Book of Fiends © 2003, Green Ronin Publishing; Authors: Aaron Loeb, Erik Mona, Chris Pramas, and Robert J. Schwalb.</p>
                                    <p>Armies of the Abyss © 2002, Green Ronin Publishing; Authors: Erik Mona and Chris Pramas.</p>
                                    <p>The Avatar's Handbook © 2003, Green Ronin Publishing; Authors: Jesse Decker and Chris Thomasson.</p>
                                    <p>Book of the Righteous © 2002, Aaron Loeb.</p>
                                    <p>Legions of Hell © 2001, Green Ronin Publishing; Author: Chris Pramas.</p>
                                    <p>The Unholy Warrior's Handbook © 2003, Green Ronin Publishing; Author: Robert J. Schwalb.</p>
                                    <p>Carbuncle from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Albie Fiore.</p>
                                    <p>Cave Fisher from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Lawrence Schick.</p>
                                    <p>Daemon, Derghodaemon from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Daemon, Piscodaemon from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Dark Creeper from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Rik Shepard.</p>
                                    <p>Dark Stalker from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Muth.</p>
                                    <p>Demon, Nabasu from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Demon, Shadow from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Neville White.</p>
                                    <p>Dracolisk from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Froghemoth from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Grippli from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Korred from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Necrophidius from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Tillbrook.</p>
                                    <p>Nereid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Quickling from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Quickwood from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.</p>
                                    <p>Scythe Tree from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene.</p>
                                    <p>Skulk from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Muth.</p>
                                    <p>Soul Eater from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by David Cook.</p>
                                    <p>Troll, Two-Headed from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Oliver Charles MacDonald.</p>
                                    <p>Yellow Musk Creeper from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Albie Fiore.</p>
                                    <p>Yellow Musk Zombie from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Albie Fiore.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Bestiary 2 (Second Edition) © 2020, Paizo Inc.; Authors: Alexander Augunas, Dennis Baker, Jesse Benner, Joseph Blomquist, Logan Bonner, Paris Crenshaw, Adam Daigle, Jesse Decker, Darrin Drader, Brian Duckwitz, Robert N. Emerson, Scott Fernandez, Keith Garrett, Scott Gladstein, Matthew Goodall, T.H. Gulliver, BJ Hensley, Tim Hitchcock, Vanessa Hoskins, James Jacobs, Brian R. James, Jason Keeley, John Laffan, Lyz Liddell, Colm Lundberg, Ron Lundeen, Jason Nelson, Randy Price, Jessica Redekop, Patrick Renie, Alistair Rigg, Alex Riggs, David N. Ross, David Schwartz, Mark Seifter, Amber Stewart, Jeffrey Swank, Russ Taylor, and Jason Tondro.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Bestiary 3
                                </div>
                                <div className="book-details">
                                    <p>Flumph from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowell and Douglas Naismith.</p>
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Bestiary 3 (Second Edition) © 2021, Paizo Inc.; Authors: Logan Bonner, James Case, Jessica Catalan, John Compton, Paris Crenshaw, Adam Daigle, Katina Davis, Erik Scott de Bie, Jesse Decker, Brian Duckwitz, Hexe Fey, Keith Garrett, Matthew Goodall, Violet Gray, Alice Grizzle, Steven Hammond, Sasha Laranoa Harving, Joan Hong, James Jacobs, Michelle Jones, Virginia Jordan, TJ Kahn, Mikko Kallio, Jason Keeley, Joshua Kim, Avi Kool, Jeff Lee, Lyz Liddell, Luis Loza, Ron Lundeen, Philippe-Antoine Menard, Patchen Mortimer, Dennis Muldoon, Andrew Mullen, Quinn Murphy, Dave Nelson, Jason Nelson, Samantha Phelan, Stephen Radney-MacFarland, Danita Rambo, Shiv Ramdas, BJ Recio, Jessica Redekop, Mikhail Rekun, Patrick Renie, Alex Riggs, David N. Ross, Simone D. Sallé, Michael Sayre, Mark Seifter, Sen.H.H.S, Abigail Slater, Rodney Sloan, Shay Snow, Pidj Sorensen, Kendra Leigh Speedling, Tan Shao Han, William Thompson, Jason Tondro, Clark Valentine, Ruvaid Virk, Skylar Wall, Andrew White, and Landon Winkler.</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>One-shots, scenarios, and other sources</h2>
                            <div className="book-section">
                                <div className="book-name">
                                    Beginner Box
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Beginner Box Game Master's Guide © 2020, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Lyz Liddell, and Mark Seifter.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    One-Shot #2: Dinner at Lionlodge
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder One-Shot: Dinner at Lionlodge © 2021, Paizo Inc.; Author: James Jacobs.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    PFS Quest #5: The Dragon who Stole Evoking Day
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Society Quest #5: The Dragon Who Stole Evoking Day © 2019, Paizo Inc.; Author: Luis Loza.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Pathfinder Society Scenario #1-03: Escaping the Grave
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Society Scenario #1–03: Escaping the Grave © 2019, Paizo Inc.; Author: Adrian Ng.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Pathfinder Society Scenario #1-23: The Star-Crossed Court
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Society Scenario #1–23: Star-Crossed Court © 2020, Paizo Inc.; Author: Alex Riggs</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Pathfinder Society Scenario #1-24: Lightning Strikes, Stars Fall
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Society Scenario #1–24: Lightning Strikes, Stars Fall © 2020, Paizo Inc.; Author: Vanessa Hoskins</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Pathfinder Society Scenario #4-11: Prisoners of the Electric Castle
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Authors: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Society Scenario #4-11: Prisoners of the Electric Castle © 2023, Paizo Inc.; Author: Jacob W. Michaels.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Pathfinder Special: Fumbus!
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Designers: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder Special: Fumbus © 2021, Paizo Inc.; Authors: Jessica Catalan, Michael Sayre, and Fred Van Lente</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Pathfinder Wake the Dead #1
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Designers: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder: Wake the Dead #1 © 2023, Paizo Inc.; Authors: Mikhail Rekun and Fred Van Lente.</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Pathfinder Wake the Dead #5
                                </div>
                                <div className="book-details">
                                    <p>Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Designers: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter.</p>
                                    <p>Pathfinder: Wake the Dead #5 © 2023, Paizo Inc.; Authors: Mikhail Rekun and Fred Van Lente.</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-rectangle">
                            <h2>Community Use Policy</h2>
                            <p>This website uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Community Use Policy (<a href="https://paizo.com/licenses/communityuse">paizo.com/licenses/communityuse</a>). We are expressly prohibited from charging you to use or access this content. This website is not published, endorsed, or specifically approved by Paizo. For more information about Paizo Inc. and Paizo products, visit <a href="https://paizo.com">paizo.com</a>.</p>
                        </div>
                        <div className="rounded-rectangle">
                            <div className="book-section">
                                <div className="book-name">
                                    Paizo Blog
                                </div>
                                <div className="book-details">
                                    <p>Used under Community Use Policy</p>
                                </div>
                            </div>
                            <div className="book-section">
                                <div className="book-name">
                                    Paizo Blog: April Fools
                                </div>
                                <div className="book-details">
                                    <p>Used under Community Use Policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-footer'>
                <button onClick={closeModal}>Close</button>
            </div>
        </Modal >
    )
}

export default LicenseModal