#!/usr/bin/perl
# To Test: http://www.sixist.co.uk/cgi-bin/counter.pl?name=test

$qs = $ENV{'QUERY_STRING'};
print "Content-Type: text/html\n\n";

@params = split(/&/, $qs);
$paramsSize = @params;
#print $paramsSize;
if ($paramsSize >= 1) {
  @param1 = split(/=/, $params[0]);
}

#print "test : \r\n";
#print $params[0];
#print "<br>";

$param1Size = @param1;
#print $param1Size;
if ($param1Size >= 2) {
  #print $param1[0];
  #print $param1[1];
  #print "<br>";
  $countername=$param1[1];
}

$counterfilename = 'counter';
$counterfile = $counterfilename . '.txt';
$counterxml = $counterfilename . '.xml';

print $counterfile . '<br>';
print $counterxml . '<br>';

# Begin Code
open(FILE, $counterfile) or die "Can't locate counter file $!\n";
@DATA = <FILE>;
close(FILE);
$SIZE = @DATA;

open(XMLFILE, $counterxml) || die "Can't locate counter xml$!\n";
@XMLDATA = <XMLFILE>;
close(XMLFILE);
$XMLSIZE = @XMLDATA;

if ($SIZE eq 0) {
  $counter = '?';
  &LocateLink;
}

if ($XMLSIZE eq 0) {
  #$counter = '?';
  #&LocateLink;
  #print 'XML EMPTY' . '<br>';
  open(XMLFILE, ">>$counterxml") || die "Can't create counter xml $!\n";
  # First time
  print XMLFILE '<?xml version="1.0" encoding="utf-8"?>' . "\n"; 
  print XMLFILE '<Counters>' . "\n"; 
  print XMLFILE '</Counters>' . "\n"; 
  close(XMLFILE);
  # reopen
  open(XMLFILE, $counterxml) || die "Can't locate counter xml$!\n";
  @XMLDATA = <XMLFILE>;
  close(XMLFILE);
  $XMLSIZE = @XMLDATA;
}



# got here; 
# todo; parse xml file for named node, update numeric value (or add new one). 


foreach $entry (@DATA) {
  ($counter, $baselink) = split(/'/, $entry);
  chomp($baselink);

  &UpdateStats if ($baselink eq $link);
}

# Add new link to database file
open(FILE, ">>$counterfile") || die Can't locate database file $!;
print FILE "1'$link\n"; # First time
close(FILE);

$counter = '1';

&LocateLink;

# Increase through-link counter
sub UpdateStats {
   $counter++;
   $entry = "$counter'$baselink\n";

   @DATA = sort {($b =~ /(\d+)/)[0] <=> ($a =~ /(\d+)/)[0]} @DATA;

   $tmpfilename = "$counterfile\.$link";
   $tmpfilename =~s/\///g;

   open(FILE, ">$tmpfilename") || die Can't locate database file $!;
   print FILE @DATA;
   close(FILE);
   rename("$tmpfilename", $counterfile);

   &LocateLink;
}

sub LocateLink {
  print "Content-Type: text/html\n\n";
  print $counter;
  exit;
}